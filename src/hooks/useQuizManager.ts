import { useState, useCallback } from 'react';
import { Quiz } from '../types';
import { QUIZ_COLORS } from '../constants';
import { generateId } from '../utils/dateUtils';

export const useQuizManager = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const addQuiz = useCallback((quiz: Omit<Quiz, 'id' | 'color'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: generateId(),
      color: QUIZ_COLORS[quizzes.length % QUIZ_COLORS.length]
    };
    setQuizzes(prev => [...prev, newQuiz]);
    return newQuiz;
  }, [quizzes.length]);

  const updateQuiz = useCallback((id: string, updates: Partial<Quiz>) => {
    setQuizzes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  const deleteQuiz = useCallback((id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  }, []);

  const clearQuizzes = useCallback(() => {
    setQuizzes([]);
  }, []);

  return { quizzes, addQuiz, updateQuiz, deleteQuiz, clearQuizzes };
};