import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface QuizState {
  totalQuestions: number;
  totalCorrect: number;
  consecutiveCorrect: number;
  totalIncorrect: number;
  answeredQuestions: boolean[];
}

type QuizAction =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "RESET_QUIZ" };

const initialState: QuizState = {
  totalQuestions: 0,
  totalCorrect: 0,
  consecutiveCorrect: 0,
  totalIncorrect: 0,
  answeredQuestions: [true, false, false, false, false],
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "ANSWER_CORRECT":
      return {
        ...state,
        totalQuestions: state.totalQuestions + 1,
        totalCorrect: state.totalCorrect + 1,
        consecutiveCorrect: state.consecutiveCorrect + 1,
        answeredQuestions: [...state.answeredQuestions, true],
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        totalQuestions: state.totalQuestions + 1,
        totalIncorrect: state.totalIncorrect + 1,
        consecutiveCorrect: 0,
        answeredQuestions: [...state.answeredQuestions, false],
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
};

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
