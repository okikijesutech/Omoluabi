import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useLifeline } from "../context/LifelineContext";
import { useContent } from "./useContent";
import { LessonContent } from "../types/content";

export const useLessonLogic = () => {
  const [modalOn, setModalOn] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const { language, category, lessonId, questionIndex } = useParams<{
    language?: string;
    category?: string;
    lessonId?: string;
    questionIndex?: string;
  }>();

  const { lives, decreaseLife } = useLifeline();

  const { content, loading, error } = useContent<LessonContent>(
    `/content/${language}/${category}/${lessonId}.json`
  );

  const handleModal = useCallback(() => setModalOn(true), []);
  const closeModal = useCallback(() => setModalOn(false), []);

  const checkAnswer = useCallback(() => {
    if (lives > 0 && !hasAnswered && content) {
      setHasAnswered(true);
      const qIndex = Number(questionIndex);
      const currentQ = content.questions[qIndex];
      const isCorrect = selectedOption === currentQ?.correctAnswer;

      if (!isCorrect) {
        decreaseLife();
      }
    }
  }, [lives, hasAnswered, content, questionIndex, selectedOption, decreaseLife]);

  const qIndex = Number(questionIndex);
  const currentQuestion = content?.questions[qIndex];
  const totalQuestions = content?.questions.length || 0;
  const hasNextQuestion = qIndex < totalQuestions - 1;
  const nextUrl = `/open-lesson/${language}/${category}/${lessonId}/${qIndex + 1}`;

  return {
    // State
    modalOn,
    selectedOption,
    hasAnswered,
    lives,
    content,
    loading,
    error,
    
    // UI Helpers
    currentQuestion,
    totalQuestions,
    hasNextQuestion,
    nextUrl,
    
    // Actions
    setSelectedOption,
    handleModal,
    closeModal,
    checkAnswer,
    
    // Raw params if needed
    params: { language, category, lessonId, questionIndex }
  };
};
