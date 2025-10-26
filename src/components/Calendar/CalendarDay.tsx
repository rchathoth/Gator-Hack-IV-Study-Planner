import React from 'react';
import { StudyPlanDay } from '../../types';
import { parseDate } from '../../utils/dateUtils';

interface CalendarDayProps {
  day: StudyPlanDay;
  isToday: boolean;
  onToggleTopic: (date: string, topicIndex: number) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  isToday, 
  onToggleTopic 
}) => {
  const date = parseDate(day.date);
  const dayNumber = date.getDate();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className={`bg-white rounded-lg p-4 border-2 ${isToday ? 'border-blue-500' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-lg font-semibold text-gray-800">{dayNumber}</p>
          <p className="text-xs text-gray-500">{dayName}</p>
        </div>
        {day.quizzes.length > 0 && (
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Quiz!
          </span>
        )}
      </div>

      {day.quizzes.length > 0 && (
        <div className="mb-3">
          {day.quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="text-xs font-medium py-1 px-2 rounded mb-1"
              style={{ backgroundColor: quiz.color + '20', color: quiz.color }}
            >
              📝 {quiz.name}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1">
        {day.topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => onToggleTopic(day.date, index)}
            className={`w-full text-left text-xs py-1 px-2 rounded transition-colors ${
              topic.completed ? 'line-through opacity-60' : ''
            } hover:opacity-80`}
            style={{ 
              backgroundColor: topic.color + '20',
              color: topic.color
            }}
          >
            {topic.isReview && '🔄 '}
            {topic.topicName}
          </button>
        ))}
      </div>

      {day.topics.length === 0 && day.quizzes.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-2">No activities</p>
      )}
    </div>
  );
};
