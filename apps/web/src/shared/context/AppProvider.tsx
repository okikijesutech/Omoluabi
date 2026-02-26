import React, { ReactNode } from "react";
import { AuthProvider } from "../../domains/user/context/AuthContext";
import { QuizProvider } from "../../domains/quiz/context/QuizContext";
import { LifelineProvider } from "../../domains/gamification/context/LifelineContext";
import { CourseProvider } from "../../domains/course/context/CourseContext";

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider consolidates all global state providers into a single wrapper.
 * This prevents deep nesting in App.tsx and improves architectural clarity.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <CourseProvider>
      <AuthProvider>
        <QuizProvider>
          <LifelineProvider>
            {children}
          </LifelineProvider>
        </QuizProvider>
      </AuthProvider>
    </CourseProvider>
  );
};

export default AppProvider;
