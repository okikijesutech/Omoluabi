import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const signup = async (email: string, password: string) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
