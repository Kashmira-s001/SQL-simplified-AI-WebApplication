import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedLessons: Set<string>;
  quizScores: Record<string, number>;
  completeLesson: (lessonId: string) => void;
  setQuizScore: (quizId: string, score: number) => void;
  getProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedLessons = localStorage.getItem('completedLessons');
    const savedScores = localStorage.getItem('quizScores');
    
    if (savedLessons) {
      setCompletedLessons(new Set(JSON.parse(savedLessons)));
    }
    if (savedScores) {
      setQuizScores(JSON.parse(savedScores));
    }
  }, []);

  const completeLesson = (lessonId: string) => {
    const updated = new Set(completedLessons).add(lessonId);
    setCompletedLessons(updated);
    localStorage.setItem('completedLessons', JSON.stringify([...updated]));
  };

  const setQuizScore = (quizId: string, score: number) => {
    const updated = { ...quizScores, [quizId]: score };
    setQuizScores(updated);
    localStorage.setItem('quizScores', JSON.stringify(updated));
  };

  const getProgress = () => {
    const totalLessons = 18; // Updated total lesson count
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedLessons,
      quizScores,
      completeLesson,
      setQuizScore,
      getProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};