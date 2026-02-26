import { Link } from "react-router-dom";
import { FaHeartCircleCheck, FaFire, FaShield } from "react-icons/fa6";
import { FaGem } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import "./InfoBar.css";
import { useLifeline } from "../../../context/LifelineContext";

const InfoBar = () => {
  const { lives, streak } = useLifeline();
  return (
    <div className='infobarContainer'>
      <div className='infobarnav'>
        <div className="stat-item streak">
          <FaFire size={24} />
          <span>{streak}</span>
        </div>
        <div className="stat-item gems">
          <FaGem size={24} />
          <span>100</span>
        </div>
        <div className="stat-item lives">
          <FaHeartCircleCheck size={24} />
          <span>{lives}</span>
        </div>
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
      <div className='infobarsocials'>
        <Link to={""} className='infobarsocialslink'>About</Link>
        <Link to={""} className='infobarsocialslink'>Blog</Link>
        <Link to={""} className='infobarsocialslink'>Store</Link>
        <Link to={""} className='infobarsocialslink'>Terms</Link>
        <Link to={""} className='infobarsocialslink'>Privacy</Link>
      </div>
    </div>
  );
};

export default InfoBar;
