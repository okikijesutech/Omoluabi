import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { GiChest, GiPoliceBadge } from "react-icons/gi";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";
import "./sidebar.css";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isLanguageLanding = location.pathname === "/learnlanguage";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <li className='more'>
          <div className='moreContent'>
            <PiDotsThreeCircleFill size={24} />
            <p>MORE</p>
          </div>
          <div className='moreOptions'>
            <p>SCHOOLS</p>
            <hr />
            <p>SETTINGS</p>
            <p>HELP</p>
            <p onClick={handleLogout}>LOGOUT</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
