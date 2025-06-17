import { Question } from "../types";

export function parseQuestions(text: string): Question[] {
  const questions: Question[] = [];
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  let currentQuestion: Partial<Question> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("Q:")) {
      if (Object.keys(currentQuestion).length > 0) {
        questions.push(currentQuestion as Question);
      }
      currentQuestion = {
        question: line.substring(2).trim(),
        answers: [],
        correctAnswers: [],
      };
    } else if (line.startsWith("A:")) {
      currentQuestion.answers = line
        .substring(2)
        .trim()
        .split(";")
        .map((a) => a.trim());
    } else if (line.startsWith("C:")) {
      currentQuestion.correctAnswers = line
        .substring(2)
        .trim()
        .split(",")
        .map((n) => parseInt(n.trim(), 10));
    }
  }

  if (Object.keys(currentQuestion).length > 0) {
    questions.push(currentQuestion as Question);
  }

  return questions;
}
