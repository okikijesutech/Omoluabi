import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

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
  const { isAuthenticated } = useAuth();
  const [lives, setLives] = useState(initialLives);
  const [lastDepleted, setLastDepleted] = useState<Date | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const loadLifeLIne = async () => {
        const userDoc = await getDoc(
          doc(db, "users", auth.currentUser?.uid || "")
        );
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setLives(userData.lives);
          setLastDepleted(userData.lastDepleted?.toDate() || null);
        }
      };
      loadLifeLIne();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAndResetLives = async () => {
      if (lives < 5 && lastDepleted) {
        const timeSinceDepletion = Date.now() - lastDepleted.getTime();
        if (timeSinceDepletion >= 24 * 60 * 60 * 1000) {
          setLives(initialLives);
          await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
            lives: initialLives,
            lastDepleted: null,
          });
        }
      }
    };
    checkAndResetLives();
  }, [lives, lastDepleted]);

  const decreaseLife = async () => {
    if (lives > 0) {
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 === 0) {
        setLastDepleted(new Date());
        await updateDoc(doc(db, "user", auth.currentUser?.uid || ""), {
          lives: lives - 1,
          lastDepleted: new Date(),
        });
      } else {
        await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
          lives: lives - 1,
        });
      }
    }
  };

  return (
    <LifelineContext.Provider value={{ lives, decreaseLife }}>
      {children}
    </LifelineContext.Provider>
  );
};
