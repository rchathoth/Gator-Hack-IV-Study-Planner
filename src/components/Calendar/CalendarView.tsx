import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StudyPlanDay } from '../../types';
import { parseDate, isSameDay } from '../../utils/dateUtils';
import { CalendarDay } from './CalendarDay';

interface CalendarViewProps {
  studyPlan: StudyPlanDay[];
  onToggleTopic: (date: string, topicIndex: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  studyPlan, 
  onToggleTopic 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const today = new Date();

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const completedCount = studyPlan.reduce((count, day) => 
    count + day.topics.filter(t => t.completed).length, 0
  );

  const totalTasks = studyPlan.reduce((count, day) => count + day.topics.length, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Study Calendar</h2>
          <p className="text-sm text-gray-600">
            Progress: {completedCount} / {totalTasks} tasks completed
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        {studyPlan.map((day) => {
          const isTodayCheck = isSameDay(parseDate(day.date), today);
          return (
            <div key={day.date} className="min-w-[200px] flex-shrink-0">
              <CalendarDay 
                day={day} 
                isToday={isTodayCheck} 
                onToggleTopic={onToggleTopic}
              />
            </div>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgb(203 213 225) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgb(203 213 225);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgb(148 163 184);
        }
      `}</style>
    </div>
  );
};
