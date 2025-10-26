import React from 'react';
import { Brain } from 'lucide-react';
import { TopicRecommendation } from '../../types';
import { TopicRecommendationCard } from './TopicRecommendationCard';

interface RecommendationsViewProps {
  recommendations: TopicRecommendation[];
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ 
  recommendations 
}) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">AI Study Recommendations</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Based on your quiz topics, here are some personalized study strategies:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((recommendation, index) => (
          <TopicRecommendationCard key={index} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
};
