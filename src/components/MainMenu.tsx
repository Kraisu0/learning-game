import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Question } from "../types";

interface MainMenuProps {
  questions: Question[];
  onStartGame: (selectedQuestions?: Question[]) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ questions, onStartGame }) => {
  const [showCustomGame, setShowCustomGame] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<boolean[]>(
    questions.map(() => true)
  );

  const handleCustomGameStart = () => {
    const filteredQuestions = questions.filter(
      (_, index) => selectedQuestions[index]
    );
    onStartGame(filteredQuestions);
    setShowCustomGame(false);
  };

  const handleQuestionToggle = (index: number) => {
    setSelectedQuestions((prev) => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index];
      return newSelection;
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Learning Game
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <Button variant="contained" size="large" onClick={() => onStartGame()}>
          Start New Game
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => setShowCustomGame(true)}
        >
          Custom Game
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => setShowQuestions(true)}
        >
          View Questions
        </Button>
      </Box>

      <Dialog
        open={showCustomGame}
        onClose={() => setShowCustomGame(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Questions for Custom Game</DialogTitle>
        <DialogContent>
          <FormGroup>
            {questions.map((question, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedQuestions[index]}
                    onChange={() => handleQuestionToggle(index)}
                  />
                }
                label={question.question}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCustomGame(false)}>Cancel</Button>
          <Button
            onClick={handleCustomGameStart}
            variant="contained"
            disabled={!selectedQuestions.some((selected) => selected)}
          >
            Start Game
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showQuestions}
        onClose={() => setShowQuestions(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Questions and Answers</DialogTitle>
        <DialogContent>
          {questions.map((question, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {question.question}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Answers: {question.answers.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Correct answers:{" "}
                  {question.correctAnswers
                    .map((i) => question.answers[i - 1])
                    .join(", ")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuestions(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainMenu;
