import { Link, useLocation } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
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
          <FaHouse />
          <Link to={""} className='lilink'>
            LEARN
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            LETTERS
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            LEADERSBOARD
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            QUESTS
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            SHOP
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            PROFILE
          </Link>
        </li>
        <li>
          <FaHouse />
          <Link to={""} className='lilink'>
            MORE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
