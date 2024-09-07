import { Link } from "react-router-dom";
import { FaHeartCircleCheck, FaFire, FaShield } from "react-icons/fa6";
import { FaGem } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import "./infobar.css";
import { useLifeline } from "../../context/LifelineContext";

const InfoBar = () => {
  const { lives, streak } = useLifeline();
  return (
    <div className='infobarContainer'>
      <div className='infobarnav'>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            color: "#ff9500",
          }}
        >
          <FaFire size={24} />
          <p style={{ color: "#ff9500" }}>{streak}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            color: "#1cb0f6",
          }}
        >
          <FaGem size={24} />
          <p style={{ color: "#1cb0f6" }}>100</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            color: "#ff4e4e",
          }}
        >
          <FaHeartCircleCheck size={24} />
          <p style={{ color: "#ff4e4e" }}>{lives}</p>
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
