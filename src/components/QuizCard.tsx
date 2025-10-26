import React from 'react';
import { Calendar } from 'lucide-react';
import { Quiz } from '../types';
import { parseDate } from '../utils/dateUtils';

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onDelete }) => {
  const quizDate = parseDate(quiz.date);
  const formattedDate = quizDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: quiz.color }}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{quiz.name}</h3>
        <button
          onClick={() => onDelete(quiz.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Delete quiz"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center text-gray-600 mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{formattedDate}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {quiz.topics.map((topic) => (
          <span
            key={topic.id}
            className="px-3 py-1 text-sm rounded-full"
            style={{ backgroundColor: quiz.color + '20', color: quiz.color }}
          >
            {topic.name}
          </span>
        ))}
      </div>
    </div>
  );
};
