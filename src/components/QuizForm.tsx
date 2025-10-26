import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Topic, Quiz } from '../types';
import { formatDate, generateId } from '../utils/dateUtils';
import { TopicInput } from './TopicInput';

interface QuizFormProps {
  onSubmit: (quiz: Omit<Quiz, 'id' | 'color'>) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [quizName, setQuizName] = useState('');
  const [quizDate, setQuizDate] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleAddTopic = () => {
    const newTopic: Topic = {
      id: generateId(),
      name: ''
    };
    setTopics([...topics, newTopic]);
  };

  const handleTopicChange = (id: string, name: string) => {
    setTopics(topics.map(t => t.id === id ? { ...t, name } : t));
  };

  const handleRemoveTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validTopics = topics.filter(t => t.name.trim() !== '');
    if (!quizName.trim() || !quizDate || validTopics.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit({
      name: quizName,
      date: quizDate,
      topics: validTopics
    });

    // Reset form
    setQuizName('');
    setQuizDate('');
    setTopics([]);
  };

  const today = new Date();
  const todayString = formatDate(today);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Quiz</h2>
      
      <div className="mb-4">
        <label htmlFor="quiz-name" className="block text-sm font-medium text-gray-700 mb-2">
          Quiz Name
        </label>
        <input
          id="quiz-name"
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="e.g., Midterm Exam"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quiz-date" className="block text-sm font-medium text-gray-700 mb-2">
          Quiz Date
        </label>
        <input
          id="quiz-date"
          type="date"
          value={quizDate}
          onChange={(e) => setQuizDate(e.target.value)}
          min={todayString}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topics
        </label>
        <div className="space-y-2">
          {topics.map((topic, index) => (
            <TopicInput
              key={topic.id}
              topic={topic}
              onChange={handleTopicChange}
              onRemove={handleRemoveTopic}
              canRemove={index > 0}
            />
          ))}
        </div>
        
        <button
          type="button"
          onClick={handleAddTopic}
          className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Topic</span>
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Add Quiz
      </button>
    </form>
  );
};
