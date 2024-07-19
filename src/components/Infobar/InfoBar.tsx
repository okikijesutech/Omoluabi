import { Link } from "react-router-dom";
import {
  FaHeartCircleCheck,
  FaFlagCheckered,
  FaFire,
  FaIceCream,
  FaShield,
} from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import "./infobar.css";
import BtnPrimary from "../btnprimary/BtnPrimary";

const InfoBar = () => {
  return (
    <div className='infobarContainer'>
      <div className='infobarnav'>
        <FaFlagCheckered color='white' size={24} />
        <FaIceCream color='blue' size={24} />
        <FaFire color='red' size={24} />
        <FaHeartCircleCheck color='red' size={24} />
      </div>
      <div className='infobardiv'>
        <h4>Unlock Leaderboards!</h4>
        <div className='leaderboardcontent'>
          <FaShield size={48} color='yellow' />
          <p>Complete 10 more lessons to start competing</p>
        </div>
      </div>
      <div className='infobardiv'>
        <div className='leaderboardcontent'>
          <h4>Daily Quest</h4>
          <Link to={"/"} className='infobarlink'>
            View All
          </Link>
        </div>
        <div className='energydiv'>
          <SlEnergy size={48} />
          <div className='energy'>
            <p>Earn 10 XP</p>
            <div className='energybar'>
              <p>0/100</p>
            </div>
          </div>
        </div>
      </div>
      <div className='infobardiv'>
        <h4>Create a profile to save your progress</h4>
        <div className='infobarprofilebtnconatiner'>
          <BtnPrimary
            title='CREATE A PROFILE'
            bgcolor='#93d333'
            textColor='#1e2f25'
            bordercolor='#93d333'
            shadow='#79b933'
            to='/register'
            hover='#7fb42a'
            hoverbordercolor='#7fb42a'
          />
        </div>
        <div>
          <BtnPrimary
            title='SIGN IN'
            bgcolor='#49c0f8'
            textColor='#16272f'
            bordercolor='#49c0f8'
            shadow='#1899d6'
            to='/login'
            hover='#38a7d6'
            hoverbordercolor='#38a7d6'
          />
        </div>
      </div>
      <div className='infobarsocials'>
        <Link to={""} className='infobarsocialslink'>
          ABOUT
        </Link>
        <Link to={""} className='infobarsocialslink'>
          BLOG
        </Link>
        <Link to={""} className='infobarsocialslink'>
          STORE
        </Link>
        <Link to={""} className='infobarsocialslink'>
          EFFICACY
        </Link>
        <Link to={""} className='infobarsocialslink'>
          CAREERS
        </Link>
        <Link to={""} className='infobarsocialslink'>
          INVESTORS
        </Link>
        <Link to={""} className='infobarsocialslink'>
          TERMS
        </Link>
        <Link to={""} className='infobarsocialslink'>
          PRIVACY
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
