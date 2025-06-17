import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, CircularProgress } from "@mui/material";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Results from "./components/Results";
import { Question, GameState } from "./types";
import { parseQuestions } from "./utils/questionParser";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedAnswers: [],
    answerHistory: [],
    score: 0,
    questions: [],
    isGameOver: false,
    showResults: false,
  });
  const [currentView, setCurrentView] = useState<"menu" | "game" | "results">(
    "menu"
  );
  const [isCustomGame, setIsCustomGame] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/data/questions.txt");
        const text = await response.text();
        const parsedQuestions = parseQuestions(text);
        setQuestions(parsedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const startGame = (selectedQuestions?: Question[]) => {
    const questionsToUse = selectedQuestions || questions;
    if (questionsToUse.length === 0) return;

    setIsCustomGame(!!selectedQuestions);
    if (selectedQuestions) {
      setSelectedQuestions(selectedQuestions);
    }

    setGameState({
      currentQuestionIndex: 0,
      selectedAnswers: [],
      answerHistory: [],
      score: 0,
      questions: questionsToUse.sort(() => Math.random() - 0.5),
      isGameOver: false,
      showResults: false,
    });
    setCurrentView("game");
  };

  const handleAnswer = (selectedAnswers: number[]) => {
    setGameState((prev) => ({
      ...prev,
      selectedAnswers,
    }));
  };

  const checkAnswer = (question: Question, selectedAnswers: number[]) => {
    if (selectedAnswers.length !== question.correctAnswers.length) {
      return false;
    }

    const sortedSelected = [...selectedAnswers].sort();
    const sortedCorrect = [...question.correctAnswers].sort();

    return sortedSelected.every(
      (answer, index) => answer === sortedCorrect[index]
    );
  };

  const handleNext = () => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = checkAnswer(currentQuestion, gameState.selectedAnswers);

    setGameState((prev) => ({
      ...prev,
      score: prev.score + (isCorrect ? 1 : 0),
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswers: [],
      answerHistory: [...prev.answerHistory, gameState.selectedAnswers],
      isGameOver: prev.currentQuestionIndex + 1 >= prev.questions.length,
      showResults: prev.currentQuestionIndex + 1 >= prev.questions.length,
    }));

    if (gameState.currentQuestionIndex + 1 >= gameState.questions.length) {
      setCurrentView("results");
    }
  };

  const handleRestart = () => {
    setCurrentView("menu");
  };

  const handlePlayAgain = () => {
    if (isCustomGame) {
      startGame(selectedQuestions);
    } else {
      startGame();
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {currentView === "menu" && (
            <MainMenu questions={questions} onStartGame={startGame} />
          )}
          {currentView === "game" && gameState.questions.length > 0 && (
            <Game
              gameState={gameState}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onRestart={handleRestart}
            />
          )}
          {currentView === "results" && (
            <Results
              gameState={gameState}
              onRestart={handleRestart}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
