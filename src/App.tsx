import React, { useState, useEffect } from 'react';
import { Brain, AlertCircle, Sparkles } from 'lucide-react';
import { StudyPlanDay, TopicRecommendation } from './types';
import { useQuizManager } from './hooks/useQuizManager';
import { AIService } from './services/AIService';
import { QuizForm } from './components/QuizForm';
import { QuizList } from './components/QuizList';
import { CalendarView } from './components/Calendar/CalendarView';
import { RecommendationsView } from './components/Recommendations/RecommendationsView';

const App: React.FC = () => {
  const { quizzes, addQuiz, deleteQuiz } = useQuizManager();
  const [studyPlan, setStudyPlan] = useState<StudyPlanDay[]>([]);
  const [recommendations, setRecommendations] = useState<TopicRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'calendar'>('quizzes');

  useEffect(() => {
    if (quizzes.length > 0) {
      generateStudyPlan();
    } else {
      setStudyPlan([]);
      setRecommendations([]);
    }
  }, [quizzes]);

  const generateStudyPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await AIService.generateStudyPlan(quizzes);
      setStudyPlan(result.studyPlan);
      setRecommendations(result.recommendations);
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTopic = (date: string, topicIndex: number) => {
    setStudyPlan(prevPlan =>
      prevPlan.map(day =>
        day.date === date
          ? {
              ...day,
              topics: day.topics.map((topic, idx) =>
                idx === topicIndex
                  ? { ...topic, completed: !topic.completed }
                  : topic
              )
            }
          : day
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Study Planner</h1>
                <p className="text-sm text-gray-600">Smart scheduling for your exams</p>
              </div>
            </div>
            {quizzes.length > 0 && (
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">{quizzes.length} Quiz{quizzes.length !== 1 ? 'zes' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        <div className="mb-8">
          <QuizForm onSubmit={addQuiz} />
        </div>

        {quizzes.length > 0 && (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'quizzes'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Your Quizzes
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'calendar'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Study Calendar
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'quizzes' && (
              <div>
                <QuizList quizzes={quizzes} onDeleteQuiz={deleteQuiz} />
              </div>
            )}

            {activeTab === 'calendar' && (
              <div>
                {loading ? (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Generating your AI study plan...</p>
                  </div>
                ) : (
                  <>
                    <RecommendationsView recommendations={recommendations} />
                    <CalendarView 
                      studyPlan={studyPlan} 
                      onToggleTopic={handleToggleTopic}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}

        {quizzes.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <Brain className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Get Started</h2>
            <p className="text-lg text-gray-600 mb-8">
              Add your first quiz above to generate a personalized AI-powered study plan
            </p>
            <div className="max-w-md mx-auto text-left bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">✨ What you'll get:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Automatic study schedule for 7-14 days before each quiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Smart topic grouping and review scheduling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>AI-powered study recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Interactive calendar to track progress</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>AI Study Planner - Plan smarter, study better</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
