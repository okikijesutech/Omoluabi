import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { BtnPrimary } from "../../components";
import { signin } from "../../services/authService";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signin(email, password);
      login();
      navigate("/learnlanguage", { replace: true });
    } catch (error: any) {
      setError(error?.message || "An error occurred during login.");
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      login();
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
          title='SIGN UP'
          bgcolor='#131f24'
          textColor='#49c0f8'
          shadow='#313f47'
          hover=''
          to='/register'
          bordercolor='#313f47'
        />
      </div>
      <div className='loginForm'>
        <h1>Log in</h1>

        <form className='form' onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='Email or username'
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
            Login
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

export default Login;
