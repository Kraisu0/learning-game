# Learning Game

A web-based learning game application that allows users to test their knowledge through multiple-choice questions.

## Features

- Multiple-choice questions with single or multiple correct answers
- Random question order
- Progress tracking
- Custom game mode to select specific questions
- Detailed results with question-by-question breakdown
- Question and answer review mode

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000

### Adding Questions

Questions are stored in `src/data/questions.txt` in the following format:

```
Q: Question text
A: Answer1, Answer2, Answer3, Answer4
C: 1,2,3,4
```

Where:

- Q: is the question
- A: is the list of possible answers (comma-separated)
- C: is the list of correct answer indices (1-based, comma-separated)

## Usage

1. Start a new game from the main menu
2. Select answers for each question
3. Click "Next Question" to proceed
4. View your results at the end of the game
5. Use the "Back to Menu" button to start a new game

## Custom Game Mode

1. Click "Custom Game" on the main menu
2. Select the questions you want to include
3. Click "Start Game" to begin with your selected questions

## View Questions

1. Click "View Questions" on the main menu
2. Browse through all available questions and their correct answers
