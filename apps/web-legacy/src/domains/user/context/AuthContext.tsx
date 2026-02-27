import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Temporarily default to authenticated for development/suspension
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<any>({
    uid: "guest-user",
    displayName: "Guest User",
    email: "guest@omoluabi.io",
  });
  const [loading, setLoading] = useState(false);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    // If Firebase isn't configured, stop loading and return
    if (!auth || Object.keys(auth).length === 0) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Return a loading spinner or null until the auth state is determined
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
