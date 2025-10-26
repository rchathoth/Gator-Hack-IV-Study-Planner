import React from 'react';
import { Trash2 } from 'lucide-react';
import { Topic } from '../types';

interface TopicInputProps {
  topic: Topic;
  onChange: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const TopicInput: React.FC<TopicInputProps> = ({ 
  topic, 
  onChange, 
  onRemove, 
  canRemove 
}) => (
  <div className="flex items-center gap-2">
    <input
      type="text"
      value={topic.name}
      onChange={(e) => onChange(topic.id, e.target.value)}
      placeholder="Topic name"
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {canRemove && (
      <button
        onClick={() => onRemove(topic.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        aria-label="Remove topic"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    )}
  </div>
);
