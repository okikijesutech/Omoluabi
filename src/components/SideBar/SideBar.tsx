import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { useAuth } from "../../context/AuthContext";
import { SIDEBAR_LINKS, NavLink } from "../../constants/navigationData";
import "./SideBar.css";

const SideBarItem = ({ link }: { link: NavLink }) => {
  const location = useLocation();
  const isActive = link.matchType === "exact" 
    ? location.pathname === link.to 
    : location.pathname.startsWith(link.to);

  return (
    <Link to={link.to} className='lilink'>
      <li className={isActive ? "highlight" : ""}>
        <link.icon size={24} />
        <p>{link.label}</p>
      </li>
    </Link>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
        {SIDEBAR_LINKS.map(link => (
          <SideBarItem key={link.to} link={link} />
        ))}
        
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
