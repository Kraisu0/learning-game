export interface Question {
  question: string;
  answers: string[];
  correctAnswers: number[];
}

export interface GameState {
  currentQuestionIndex: number;
  selectedAnswers: number[];
  answerHistory: number[][];
  score: number;
  questions: Question[];
  isGameOver: boolean;
  showResults: boolean;
}

export interface QuestionResult {
  question: string;
  score: number;
  maxScore: number;
}
