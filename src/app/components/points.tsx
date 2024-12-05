"use client"
import { createContext, useState, ReactNode, useContext } from 'react';

// Define the type for the context
interface ScoreContextType {
  score: number | null;
  setScore: (score: number) => void;
}

// Create the ScoreContext with a default value
const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

// Custom hook to use the ScoreContext
export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};

// ScoreProvider component that will provide the context to children
export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState<number | null>(null);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
