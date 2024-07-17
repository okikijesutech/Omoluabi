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
        <li className={isLanguageLanding ? "highlight" : ""}>
          <FaHouse size={24} />
          <p>
            <Link to={""} className='lilink'>
              LEARN
            </Link>
          </p>
        </li>
        <li>
          <RiCharacterRecognitionFill size={24} />
          <p>
            <Link to={""} className='lilink'>
              LETTERS
            </Link>
          </p>
        </li>
        <li>
          <GiPoliceBadge size={24} />
          <p>
            <Link to={""} className='lilink'>
              LEADERSBOARD
            </Link>
          </p>
        </li>
        <li>
          <GiChest size={24} />
          <p>
            <Link to={""} className='lilink'>
              QUESTS
            </Link>
          </p>
        </li>
        <li>
          <CiShop size={24} />
          <p>
            <Link to={""} className='lilink'>
              SHOP
            </Link>
          </p>
        </li>
        <li>
          <FaUser size={24} />
          <p>
            <Link to={""} className='lilink'>
              PROFILE
            </Link>
          </p>
        </li>
        <li>
          <PiDotsThreeCircleFill size={24} />
          <p>
            <Link to={""} className='lilink'>
              MORE
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
