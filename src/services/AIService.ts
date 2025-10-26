import { StudyPlanDay, TopicRecommendation, Quiz, AIResponse } from '../types';

export class AIService {
  /**
   * Generates an AI-powered study plan based on quizzes
   * This is a mock implementation - replace with actual AI API call
   */
  static async generateStudyPlan(quizzes: Quiz[]): Promise<AIResponse> {
    // Sort quizzes by date
    const sortedQuizzes = [...quizzes].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const studyPlan: StudyPlanDay[] = [];
    const today = new Date();
    
    // Generate study plan for the next 30 days or until the last quiz
    const lastQuizDate = new Date(sortedQuizzes[sortedQuizzes.length - 1]?.date || today.toISOString().split('T')[0]);
    
    for (let i = 0; i <= 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];

      if (currentDate > lastQuizDate && currentDate > today) {
        break;
      }

      const dayPlan: StudyPlanDay = {
        date: dateString,
        topics: [],
        quizzes: []
      };

      // Find quizzes happening on this day
      const quizzesToday = sortedQuizzes.filter(q => q.date === dateString);
      dayPlan.quizzes = quizzesToday.map(q => ({
        id: q.id,
        name: q.name,
        color: q.color
      }));

      // Determine study topics based on upcoming quizzes
      sortedQuizzes.forEach(quiz => {
        const quizDate = new Date(quiz.date);
        const daysUntilQuiz = Math.ceil((quizDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        quiz.topics.forEach((topic) => {
          if (daysUntilQuiz > 0 && daysUntilQuiz <= 7) {
            // Initial study for topics within 7 days
            dayPlan.topics.push({
              quizId: quiz.id,
              quizName: quiz.name,
              topicName: topic.name,
              color: quiz.color,
              isReview: false,
              completed: false
            });
          } else if (daysUntilQuiz > 0 && daysUntilQuiz <= 14) {
            // Review topics studied 7 days ago
            dayPlan.topics.push({
              quizId: quiz.id,
              quizName: quiz.name,
              topicName: topic.name,
              color: quiz.color,
              isReview: true,
              completed: false
            });
          }
        });
      });

      // Limit topics per day to avoid overload (max 4 per day)
      if (dayPlan.topics.length > 4) {
        dayPlan.topics = dayPlan.topics.slice(0, 4);
      }

      studyPlan.push(dayPlan);
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(sortedQuizzes);

    return { studyPlan, recommendations };
  }

  /**
   * Analyzes topic order and suggests improvements
   */
  static analyzeTopicOrder(quizzes: Quiz[]): string[] {
    const suggestions: string[] = [];
    
    quizzes.forEach(quiz => {
      if (quiz.topics.length > 5) {
        suggestions.push(`⚠️ ${quiz.name} has ${quiz.topics.length} topics. Consider breaking it into smaller quizzes.`);
      }
    });

    return suggestions;
  }

  /**
   * Calculates study intensity for a given quiz
   */
  static calculateStudyIntensity(quiz: Quiz, daysUntilQuiz: number): 'low' | 'medium' | 'high' {
    const topicCount = quiz.topics.length;
    
    if (topicCount <= 2 && daysUntilQuiz >= 3) return 'low';
    if (topicCount <= 4 && daysUntilQuiz >= 5) return 'medium';
    return 'high';
  }

  /**
   * Generates AI-powered recommendations
   */
  private static generateRecommendations(quizzes: Quiz[]): TopicRecommendation[] {
    const recommendations: TopicRecommendation[] = [];

    quizzes.forEach(quiz => {
      const topics = quiz.topics.map(t => t.name);
      
      // Always create at least one recommendation per quiz
      if (topics.length > 0) {
        // Generate detailed, specific recommendations
        const mainTopic = topics[0];
        const topicCount = topics.length;
        const daysUntilQuiz = this.getDaysUntilQuiz(quiz);
        
        // Detailed recommendations based on quiz characteristics
        const detailedRecommendations: string[] = [];
        
        if (topicCount === 1) {
          detailedRecommendations.push(
            `📖 Deep dive into ${mainTopic} - focus on understanding core concepts first`,
            `✍️ Create summary notes or concept maps for ${mainTopic}`,
            `🔄 Practice retrieval: test yourself on ${mainTopic} daily`,
            `📚 Use the Feynman Technique: teach ${mainTopic} to someone else`
          );
        } else if (topicCount <= 3) {
          detailedRecommendations.push(
            `🎯 Prioritize depth over breadth - spend 2-3 hours per topic`,
            `🔗 Look for connections between ${topics.join(', ')}`,
            `⏱️ Use the Pomodoro Technique: 25 min study, 5 min break`,
            `🧠 Active recall: close your notes and explain each topic`,
            `📝 Create a study schedule: ${topics.length} topics over ${Math.max(3, daysUntilQuiz)} days`
          );
        } else {
          detailedRecommendations.push(
            `⚠️ Large scope! Focus on ${mainTopic} and 2-3 other high-priority topics`,
            `📊 Create a priority matrix: rate topics by importance and difficulty`,
            `🎯 Break topics into study blocks of 1-2 hours each`,
            `📅 Review spaced repetition: revisit topics after 1 day, 3 days, and 7 days`,
            `💪 Interleave practice: mix topics rather than studying one at a time`
          );
        }

        // Add general high-value study tips
        detailedRecommendations.push(
          `🧪 Self-test: use practice problems, not just re-reading`,
          `🔄 Apply the 80/20 rule: focus on high-yield concepts that cover most questions`,
          `📱 Use your phone's "Do Not Disturb" mode during study sessions`,
          `🧘 Take breaks every 50-90 minutes for optimal retention`
        );

        recommendations.push({
          topic: mainTopic,
          quizName: quiz.name,
          recommendations: detailedRecommendations.slice(0, Math.min(6, topicCount + 4)),
          color: quiz.color
        });

        // Add individual topic recommendations for each topic if multiple
        if (topics.length > 1) {
          topics.slice(1).forEach((topic) => {
            recommendations.push({
              topic: topic,
              quizName: quiz.name,
              recommendations: [
                `🎯 Specific focus for ${topic}: identify the key questions you need to answer`,
                `📖 Read actively: take notes and ask questions about ${topic}`,
                `🔍 Create examples: relate ${topic} to real-world applications`,
                `💬 Explain ${topic} out loud without looking at notes`,
                `✅ Create a checklist: what must you know about ${topic}?`,
                `🕐 Time management: allocate ${Math.ceil((daysUntilQuiz * 2) / topics.length)} hours for ${topic}`
              ],
              color: quiz.color
            });
          });
        }
      }
    });

    return recommendations;
  }

  /**
   * Helper method to calculate days until quiz
   */
  private static getDaysUntilQuiz(quiz: Quiz): number {
    const quizDate = new Date(quiz.date);
    const today = new Date();
    const diffTime = quizDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Parses AI response (placeholder for real AI integration)
   */
  static parseAIResponse(_response: string): AIResponse {
    // This would parse actual AI API response
    // For now, return empty data
    return {
      studyPlan: [],
      recommendations: []
    };
  }
}
