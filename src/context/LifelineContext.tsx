import React, { createContext, useContext, useState, ReactNode } from "react";

interface LifelineContextType {
  lives: number;
  decreaseLife: () => void;
}

const initialLives = 5;
const LifelineContext = createContext<LifelineContextType>({
  lives: initialLives,
  decreaseLife: () => {},
});

export const useLifeline = () => {
  return useContext(LifelineContext);
};

interface LifelineProviderProps {
  children: ReactNode;
}

export const LifelineProvider: React.FC<LifelineProviderProps> = ({
  children,
}) => {
  const [lives, setLives] = useState(initialLives);

  const decreaseLife = () => {
    setLives((prevLives) => prevLives - 1);
  };

  return (
    <LifelineContext.Provider value={{ lives, decreaseLife }}>
      {children}
    </LifelineContext.Provider>
  );
};
