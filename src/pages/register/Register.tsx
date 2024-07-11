import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { BtnPrimary } from "../../components";
import "./register.css";

const Login = () => {
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

        <form className='form'>
          <input type='number' placeholder='Age' className='formInput' />
          <p className='terms1'>
            Providing your age ensures you get the right Duolingo experience.
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
          />
          <input type='email' placeholder='Email' className='formInput' />
          <input type='password' placeholder='Password' className='formInput' />
        </form>
        <div className='btnloginconatiner'>
          <BtnPrimary
            title='CREATE ACCOUNT'
            bgcolor='#49c0f8'
            textColor='#131f24'
            shadow='#1aa8eb'
            hover='#50d3ff'
            to='/dashboard'
            bordercolor='#49c0f8'
          />
        </div>
        <div className='formOr'>
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <div className='btncontainer'>
          <BtnPrimary
            title='FACEBOOK'
            bgcolor='#131f24'
            textColor='#49c0f8'
            shadow='#313f47'
            hover=''
            to='/facebook-login'
            bordercolor='#313f47'
          />
        </div>
        <p className='terms'>
          By signing in to Duolingo, you agree to our Terms and
          <a href='/privacy-policy'>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
