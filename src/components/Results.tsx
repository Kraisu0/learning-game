import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { GameState } from "../types";

interface ResultsProps {
  gameState: GameState;
  onRestart: () => void;
  onPlayAgain: () => void;
}

const Results: React.FC<ResultsProps> = ({
  gameState,
  onRestart,
  onPlayAgain,
}) => {
  const totalQuestions = gameState.questions.length;
  const score = gameState.score;
  const percentage = (score / totalQuestions) * 100;

  const checkAnswer = (question: any, selectedAnswers: number[]) => {
    if (selectedAnswers.length !== question.correctAnswers.length) {
      return false;
    }

    const sortedSelected = [...selectedAnswers].sort();
    const sortedCorrect = [...question.correctAnswers].sort();

    return sortedSelected.every(
      (answer, index) => answer === sortedCorrect[index]
    );
  };

  const getRowStyle = (question: any, userAnswers: number[]) => {
    if (!userAnswers || userAnswers.length === 0) {
      return { backgroundColor: "#ffebee" }; // czerwone tło dla braku odpowiedzi
    }

    const isCorrect = checkAnswer(question, userAnswers);
    if (isCorrect) {
      return { backgroundColor: "#e8f5e9" }; // zielone tło dla wszystkich poprawnych
    }
    return { backgroundColor: "#ffebee" }; // czerwone tło dla błędnych
  };

  const getAnswerStyle = (
    answer: string,
    isCorrect: boolean,
    isSelected: boolean,
    rowStyle: any
  ) => {
    if (rowStyle.backgroundColor === "#e8f5e9") {
      return { color: "#2e7d32", fontWeight: "bold" }; // zielony dla poprawnych w zielonym wierszu
    }
    if (rowStyle.backgroundColor === "#ffebee") {
      if (isSelected && !isCorrect) {
        return { color: "#c62828", fontWeight: "bold" }; // czerwony dla błędnych odpowiedzi
      }
      if (isCorrect && !isSelected) {
        return { color: "#c62828", fontWeight: "bold" }; // czerwony dla brakujących poprawnych
      }
    }
    return { color: "#000000", fontWeight: "normal" }; // czarny dla pozostałych
  };

  const formatAnswers = (answers: string[]) => {
    return answers.map((answer, index) => `• ${answer}`).join("\n");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Game Results
          </Typography>
          <Typography variant="h5" gutterBottom align="center">
            Score: {score} out of {totalQuestions}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            ({percentage.toFixed(1)}%)
          </Typography>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Your Answer</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameState.questions.map((question, index) => {
              const userAnswers = gameState.answerHistory[index] || [];
              const isCorrect = checkAnswer(question, userAnswers);
              const rowStyle = getRowStyle(question, userAnswers);

              return (
                <TableRow key={index} style={rowStyle}>
                  <TableCell>{question.question}</TableCell>
                  <TableCell>
                    {userAnswers.length === 0 ? (
                      <Typography
                        style={{ color: "#c62828", fontStyle: "italic" }}
                      >
                        No answer selected
                      </Typography>
                    ) : (
                      userAnswers.map((answerIndex) => (
                        <Typography
                          key={answerIndex}
                          style={getAnswerStyle(
                            question.answers[answerIndex - 1],
                            question.correctAnswers.includes(answerIndex),
                            true,
                            rowStyle
                          )}
                          sx={{
                            whiteSpace: "pre-line",
                            mb: 0.5,
                            padding: "2px 4px",
                            borderRadius: "4px",
                          }}
                        >
                          {`• ${question.answers[answerIndex - 1]}`}
                        </Typography>
                      ))
                    )}
                  </TableCell>
                  <TableCell>
                    {question.correctAnswers.map((correctIndex) => (
                      <Typography
                        key={correctIndex}
                        sx={{
                          whiteSpace: "pre-line",
                          mb: 0.5,
                          color: "#000000",
                          fontWeight: "normal",
                        }}
                      >
                        {`• ${question.answers[correctIndex - 1]}`}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>{isCorrect ? 1 : 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="large" onClick={onRestart}>
            Back to Menu
          </Button>
          <Button variant="contained" size="large" onClick={onPlayAgain}>
            Play Again
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Results;
