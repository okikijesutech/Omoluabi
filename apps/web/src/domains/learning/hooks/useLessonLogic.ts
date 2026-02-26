import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Lesson, LearningEngine } from "@omoluabi/shared-types";
// Note: if LearningEngine is in core-engine, we should import it from there.
// For now, I'll keep it as @omoluabi/shared-types if it's there or update to @omoluabi/core-engine.
import { useLifeline } from "@domains/gamification/context/LifelineContext";
import { useContent } from "@domains/content/hooks/useContent";

export const useLessonLogic = () => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const { language, category, lessonId, questionIndex = "0" } = useParams<{
    language?: string;
    category?: string;
    lessonId?: string;
    questionIndex?: string;
  }>();

  const { lives, decreaseLife } = useLifeline();

  const { content, loading, error } = useContent<Lesson>(
    `/content/${language}/${category}/${lessonId}.json`
  );

  const userProgress = useMemo(() => {
    return LearningEngine.initializeProgress("guest", "default-course");
  }, []);

  const handleModal = useCallback(() => setModalOn(true), []);
  const closeModal = useCallback(() => setModalOn(false), []);

  const qIndex = Number(questionIndex);
  const exercises = content?.exercises || [];
  const currentExercise = exercises[qIndex];
  const totalExercises = exercises.length;
  const hasNextExercise = qIndex < totalExercises - 1;

  const checkAnswer = useCallback(() => {
    if (lives <= 0 || hasAnswered || !currentExercise) {
      return;
    }

    setHasAnswered(true);
    const isCorrect = LearningEngine.gradeExercise(currentExercise, selectedOption || "");

    if (!isCorrect) {
      decreaseLife();
    }
    
    // In a real app, we would call LearningEngine.processResult 
    // and persist the updated progress to the backend/context.
  }, [lives, hasAnswered, currentExercise, selectedOption, decreaseLife]);

  const nextUrl = `/lesson/${language}/${category}/${lessonId}/${qIndex + 1}`;

  return {
    modalOn,
    selectedOption,
    hasAnswered,
    lives,
    content,
    loading,
    error,
    qIndex,
    currentQuestion: currentExercise, // Maintain alias for UI compatibility
    totalQuestions: totalExercises,
    hasNextQuestion: hasNextExercise,
    nextUrl,
    setSelectedOption,
    handleModal,
    closeModal,
    checkAnswer,
    params: { language, category, lessonId, questionIndex }
  };
};
