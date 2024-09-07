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
  streak: number;
  decreaseLife: () => void;
  updateStreak: () => void;
}

const initialLives = 5;
const LifelineContext = createContext<LifelineContextType>({
  lives: initialLives,
  streak: 0,
  decreaseLife: () => {},
  updateStreak: () => {},
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
  const [streak, setStreak] = useState(0);
  const [lastDepleted, setLastDepleted] = useState<Date | null>(null);
  const [lastPlayed, setLastPlayed] = useState<Date | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const loadLifeLIne = async () => {
        const userDoc = await getDoc(
          doc(db, "users", auth.currentUser?.uid || "")
        );
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setLives(userData.lives);
          setStreak(userData.streak || 0);
          setLastDepleted(userData.lastDepleted?.toDate() || null);
          setLastPlayed(userData.lastPlayed?.toDate() || null);
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
        await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
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

  const updateStreak = async () => {
    const today = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (lastPlayed) {
      const timeDifference = today.getTime() - lastPlayed.getTime();
      const daysDifference = Math.floor(timeDifference / oneDayInMs);

      if (daysDifference === 1) {
        // Played consectively, increment streak
        setStreak((prevStreak) => prevStreak + 1);
        await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
          streak: streak + 1,
          lastPlayed: today,
        });
      } else if (daysDifference > 1) {
        //missed a day, reset streak
        setStreak(1);
        await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
          streak: 1,
          lastPlayed: today,
        });
      } else {
        setStreak(1);
        await updateDoc(doc(db, "users", auth.currentUser?.uid || ""), {
          streak: 1,
          lastPlayed: today,
        });
      }
    }
  };

  return (
    <LifelineContext.Provider
      value={{ lives, streak, decreaseLife, updateStreak }}
    >
      {children}
    </LifelineContext.Provider>
  );
};
