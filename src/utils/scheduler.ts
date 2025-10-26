import { Quiz, StudyPlanDay } from '../types';
import { formatDate, parseDate } from './dateUtils';

const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Generate a balanced study plan that gives each topic fair coverage
 * across the available days before its quiz.
 *
 * Strategy:
 * - For each topic, target review offsets before the quiz: [14, 7, 3, 1]
 * - Only use offsets that are <= daysUntilQuiz
 * - For each target date, try to place the topic there; if that day is full
 *   (reached maxTopicsPerDay), move it to the nearest earlier day with capacity,
 *   or the nearest later day before the quiz.
 * - This rotates topics across days and prevents one-day overloads.
 */
export function generateBalancedStudyPlan(quizzes: Quiz[], daysAhead = 30, maxTopicsPerDay = 4): StudyPlanDay[] {
  const today = new Date();
  // find last quiz date or today + daysAhead
  const quizDates = quizzes.map(q => parseDate(q.date));
  const maxQuizDate = quizDates.length ? new Date(Math.max(...quizDates.map(d => d.getTime()))) : new Date(today.getTime() + daysAhead * DAY_MS);
  const horizon = new Date(Math.max(maxQuizDate.getTime(), today.getTime() + daysAhead * DAY_MS));

  // initialize day map
  const dayMap: Map<string, StudyPlanDay> = new Map();
  for (let d = new Date(today); d.getTime() <= horizon.getTime(); d.setDate(d.getDate() + 1)) {
    const ds = formatDate(new Date(d));
    dayMap.set(ds, { date: ds, topics: [], quizzes: [] });
  }

  // helper to add a topic object to a day, with capacity handling
  const tryPlace = (dateStr: string, topicObj: StudyPlanDay['topics'][0]): boolean => {
    const day = dayMap.get(dateStr);
    if (!day) return false;
    if (day.topics.length < maxTopicsPerDay) {
      day.topics.push(topicObj);
      return true;
    }
    return false;
  };

  // collect quizzes per day (so calendar shows them)
  quizzes.forEach(q => {
    const ds = formatDate(parseDate(q.date));
    const day = dayMap.get(ds);
    if (day) {
      day.quizzes.push({ id: q.id, name: q.name, color: q.color });
    }
  });

  // candidate offsets (days before quiz) from far to near
  const OFFSETS = [14, 7, 3, 1];

  // build list of topics to schedule
  const topicsToSchedule: Array<{
    quizId: string;
    quizName: string;
    topicName: string;
    color: string;
    quizDate: Date;
  }> = [];

  quizzes.forEach(q => {
    const qDate = parseDate(q.date);
    q.topics.forEach(t => {
      topicsToSchedule.push({ quizId: q.id, quizName: q.name, topicName: t.name, color: q.color, quizDate: qDate });
    });
  });

  // For each topic, compute preferred days and place them trying to balance load
  topicsToSchedule.forEach(topic => {
    const daysUntilQuiz = Math.ceil((topic.quizDate.getTime() - today.getTime()) / DAY_MS);
    // if quiz already passed or is today, schedule at earliest available (today)
    const candidateOffsets = OFFSETS.filter(o => o <= daysUntilQuiz).length ? OFFSETS.filter(o => o <= daysUntilQuiz) : [Math.max(0, daysUntilQuiz)];

    // iterate offsets from farthest to nearest so that early study happens earlier
    candidateOffsets.sort((a, b) => b - a).forEach(offset => {
      let target = new Date(topic.quizDate);
      target.setDate(topic.quizDate.getDate() - offset);
      if (target.getTime() < today.getTime()) target = new Date(today);
      // clamp to not after quiz date
      if (target.getTime() > topic.quizDate.getTime()) target = new Date(topic.quizDate);

      let placed = false;
      const targetStr = formatDate(target);

      // 1) try target day
      placed = tryPlace(targetStr, {
        quizId: topic.quizId,
        quizName: topic.quizName,
        topicName: topic.topicName,
        color: topic.color,
        isReview: offset <= 7,
        completed: false
      });

      // 2) if full, try earlier days down to today
      if (!placed) {
        for (let d = new Date(target); d.getTime() >= today.getTime(); d.setDate(d.getDate() - 1)) {
          const ds = formatDate(new Date(d));
          if (tryPlace(ds, {
            quizId: topic.quizId,
            quizName: topic.quizName,
            topicName: topic.topicName,
            color: topic.color,
            isReview: offset <= 7,
            completed: false
          })) {
            placed = true;
            break;
          }
        }
      }

      // 3) if still not placed, try forward days until quiz date
      if (!placed) {
        for (let d = new Date(target); d.getTime() <= topic.quizDate.getTime(); d.setDate(d.getDate() + 1)) {
          const ds = formatDate(new Date(d));
          if (tryPlace(ds, {
            quizId: topic.quizId,
            quizName: topic.quizName,
            topicName: topic.topicName,
            color: topic.color,
            isReview: offset <= 7,
            completed: false
          })) {
            placed = true;
            break;
          }
        }
      }

      // If no place found (very tightly packed), place on nearest day ignoring max (last resort)
      if (!placed) {
        const ds = formatDate(target);
        const day = dayMap.get(ds);
        if (day) {
          day.topics.push({
            quizId: topic.quizId,
            quizName: topic.quizName,
            topicName: topic.topicName,
            color: topic.color,
            isReview: offset <= 7,
            completed: false
          });
        }
      }
    });
  });

  // Convert dayMap to array sorted by date
  const result: StudyPlanDay[] = Array.from(dayMap.values()).sort((a, b) => (a.date < b.date ? -1 : 1));

  // Final per-day trim if still over capacity
  result.forEach(day => {
    if (day.topics.length > maxTopicsPerDay) {
      day.topics = day.topics.slice(0, maxTopicsPerDay);
    }
  });

  return result;
}

export default generateBalancedStudyPlan;
