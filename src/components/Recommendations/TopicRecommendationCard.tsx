import React from 'react';
import { Lightbulb } from 'lucide-react';
import { TopicRecommendation } from '../../types';

interface TopicRecommendationCardProps {
  recommendation: TopicRecommendation;
}

export const TopicRecommendationCard: React.FC<TopicRecommendationCardProps> = ({ 
  recommendation 
}) => (
  <div className="bg-white rounded-lg p-6 border-l-4 shadow-sm hover:shadow-md transition-shadow" 
       style={{ borderLeftColor: recommendation.color }}>
    <div className="flex items-start gap-3 mb-3">
      <Lightbulb className="w-6 h-6 flex-shrink-0" style={{ color: recommendation.color }} />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {recommendation.topic}
        </h3>
        <p className="text-sm text-gray-500 mb-3">For: {recommendation.quizName}</p>
      </div>
    </div>

    <ul className="space-y-2">
      {recommendation.recommendations.map((rec, index) => (
        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          <span>{rec}</span>
        </li>
      ))}
    </ul>
  </div>
);
