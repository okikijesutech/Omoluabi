import { Link, useLocation } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { GiChest, GiPoliceBadge } from "react-icons/gi";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import "./sidebar.css";

const SideBar = () => {
  const location = useLocation();

  const isLanguageLanding = location.pathname === "/learnlanguage";

  return (
    <div className='sidebarcontainer'>
      <div className='logo'>
        <h1>Ọmọlúàbí</h1>
      </div>
      <ul>
        <Link to={"/learnlanguage"} className='lilink'>
          <li className={isLanguageLanding ? "highlight" : ""}>
            <FaHouse size={24} />
            <p>LEARN</p>
          </li>
        </Link>
        <Link to={"/learnlanguage/literacy"} className='lilink'>
          <li
            className={
              location.pathname.startsWith("/learnlanguage/literacy")
                ? "highlight"
                : ""
            }
          >
            <RiCharacterRecognitionFill size={24} />
            <p>LITERACY</p>
          </li>
        </Link>
        <Link to={"/learnlanguage/leaderboard"} className='lilink'>
          <li
            className={
              location.pathname === "/learnlanguage/leaderboard"
                ? "highlight"
                : ""
            }
          >
            <GiPoliceBadge size={24} />
            <p>LEADERSBOARD</p>
          </li>
        </Link>
        <Link to={"/learnlanguage/quests"} className='lilink'>
          <li
            className={
              location.pathname === "/learnlanguage/quests" ? "highlight" : ""
            }
          >
            <GiChest size={24} />
            <p>QUESTS</p>
          </li>
        </Link>
        <Link to={"/learnlanguage/shop"} className='lilink'>
          <li
            className={
              location.pathname === "/learnlanguage/shop" ? "highlight" : ""
            }
          >
            <CiShop size={24} />
            <p>SHOP</p>
          </li>
        </Link>
        <Link to={"/learnlanguage/profile"} className='lilink'>
          <li
            className={
              location.pathname === "/learnlanguage/profile" ? "highlight" : ""
            }
          >
            <FaUser size={24} />
            <p>PROFILE</p>
          </li>
        </Link>
        <Link to={""} className='lilink'>
          <li>
            <PiDotsThreeCircleFill size={24} />
            <p>MORE</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
