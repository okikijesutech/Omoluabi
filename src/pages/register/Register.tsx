import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { BtnPrimary } from "../../components";
import { signup } from "../../services/authService";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        age,
        name: name || user.displayName,
        uid: user.uid,
        lives: 5,
        lastDepleted: null,
      });
      login(user);
      navigate("/learnlanguage");
    } catch (error: any) {
      setError(error?.message || "An error occurred during registration.");
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        age: "",
        name: user.displayName || "",
        uid: user.uid,
        lives: 5,
        lastDepleted: null,
      });
      login(user);
      navigate("/learnlanguage");
    } catch (error: any) {
      setError(error?.message || "An error occurred during Google Sign-In.");
    }
  };

  return (
    <div className='login'>
      <div className='top'>
        <Link to={"/"}>
          <FaXmark size={24} color='#313f47' />
        </Link>
        <BtnPrimary
          title='LOGIN'
          bgcolor='#131f24'
          textColor='#49c0f8'
          shadow='#313f47'
          hover=''
          to='/login'
          bordercolor='#313f47'
        />
      </div>
      <div className='loginForm'>
        <h1>Create your profile</h1>

        <form className='form' onSubmit={handleRegister}>
          <input
            type='number'
            placeholder='Age'
            value={age}
            className='formInput'
            onChange={(e) => setAge(e.target.value)}
          />
          <p className='terms1'>
            Providing your age ensures you get the right Omoluabi experience.
            For more details, please visit our
            <a
              href='/privacy-policy'
              style={{ color: "white", marginLeft: "2px" }}
            >
              Privacy Policy
            </a>
            .
          </p>
          <input
            type='text'
            placeholder='Name (optional)'
            className='formInput'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='formInput'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='formInput'
          />
          {error && <p className='error'>{error}</p>}
          <button type='submit' className='btn'>
            CREATE ACCOUNT
          </button>
        </form>

        <div className='formOr'>
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <BtnPrimary
          title='Sign in with Google'
          bgcolor='#131f24'
          textColor='#49c0f8'
          shadow='#313f47'
          hover=''
          bordercolor='#313f47'
          onClick={handleGoogleSignIn}
        />

        <p className='terms'>
          By signing in to Omoluabi, you agree to our{" "}
          <a href='/privacy-policy'>Terms and Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
