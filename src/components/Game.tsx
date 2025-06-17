import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { GameState } from "../types";

interface GameProps {
  gameState: GameState;
  onAnswer: (selectedAnswers: number[]) => void;
  onNext: () => void;
  onRestart: () => void;
}

const Game: React.FC<GameProps> = ({
  gameState,
  onAnswer,
  onNext,
  onRestart,
}) => {
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progress =
    (gameState.currentQuestionIndex / gameState.questions.length) * 100;

  const handleAnswerChange = (answerIndex: number) => {
    const newSelectedAnswers = gameState.selectedAnswers.includes(
      answerIndex + 1
    )
      ? gameState.selectedAnswers.filter((a) => a !== answerIndex + 1)
      : [...gameState.selectedAnswers, answerIndex + 1];
    onAnswer(newSelectedAnswers);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Question {gameState.currentQuestionIndex + 1} of{" "}
          {gameState.questions.length}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {currentQuestion.question}
          </Typography>

          <FormGroup>
            {currentQuestion.answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={gameState.selectedAnswers.includes(index + 1)}
                    onChange={() => handleAnswerChange(index)}
                  />
                }
                label={answer}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="outlined" onClick={onRestart}>
          Back to Menu
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={gameState.selectedAnswers.length === 0}
        >
          {gameState.currentQuestionIndex === gameState.questions.length - 1
            ? "Finish"
            : "Next Question"}
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
