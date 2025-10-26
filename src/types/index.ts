export interface Topic {
  id: string;
  name: string;
}

export interface Quiz {
  id: string;
  name: string;
  date: string;
  topics: Topic[];
  color: string;
}

export interface StudyPlanDay {
  date: string;
  topics: {
    quizId: string;
    quizName: string;
    topicName: string;
    color: string;
    isReview?: boolean;
    completed?: boolean;
  }[];
  quizzes: {
    id: string;
    name: string;
    color: string;
  }[];
}

export interface TopicRecommendation {
  topic: string;
  quizName: string;
  recommendations: string[];
  color: string;
}

export interface AIResponse {
  studyPlan: StudyPlanDay[];
  recommendations: TopicRecommendation[];
}