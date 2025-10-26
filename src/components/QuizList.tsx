import React from 'react';
import { Calendar } from 'lucide-react';
import { Quiz } from '../types';
import { QuizCard } from './QuizCard';

interface QuizListProps {
  quizzes: Quiz[];
  onDeleteQuiz: (id: string) => void;
}

export const QuizList: React.FC<QuizListProps> = ({ quizzes, onDeleteQuiz }) => {
  if (quizzes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No quizzes yet</h3>
        <p className="text-gray-500">Add your first quiz to get started with your AI-powered study plan!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Quizzes ({quizzes.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={onDeleteQuiz} />
        ))}
      </div>
    </div>
  );
};
