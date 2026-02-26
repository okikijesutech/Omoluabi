import React, { createContext, useContext, useState } from 'react';
import { Course, UserProgress } from '../core/types';
import { LearningEngine } from '../core/engine';

interface CourseContextType {
  course: Course | null;
  currentProgress: UserProgress | null;
  loading: boolean;
  error: string | null;
  loadCourse: (language: string) => Promise<void>;
  updateProgress: (isCorrect: boolean) => void;
  completeLesson: (lessonId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [currentProgress, setCurrentProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourse = async (language: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/content/${language}/course.json`);
      if (!response.ok) throw new Error(`Failed to load ${language} course`);
      const data: Course = await response.json();
      setCourse(data);
      
      // Initialize progress if not exists (in a real app, load from backend/localStorage)
      const initialProgress = LearningEngine.initializeProgress("guest", data.id);
      setCurrentProgress(initialProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = (isCorrect: boolean) => {
    if (!currentProgress) return;
    const updated = LearningEngine.processResult(currentProgress, isCorrect);
    setCurrentProgress(updated);
  };

  const completeLesson = (lessonId: string) => {
    if (!currentProgress) return;
    if (!currentProgress.completedLessons.includes(lessonId)) {
      setCurrentProgress({
        ...currentProgress,
        completedLessons: [...currentProgress.completedLessons, lessonId]
      });
    }
  };

  return (
    <CourseContext.Provider value={{ 
      course, 
      currentProgress, 
      loading, 
      error, 
      loadCourse, 
      updateProgress, 
      completeLesson 
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
