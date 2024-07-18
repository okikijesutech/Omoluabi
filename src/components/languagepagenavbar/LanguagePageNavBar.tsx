import { Link } from "react-router-dom";
import ProgressBar from "../progressbar/ProgressBar";
import { FaCog, FaHeart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLifeline } from "../../context/LifelineContext";
import "./languagepagenavbar.css";

interface LanguagePageNavBarProps {
  onSettingsClick: () => void;
}

const LanguagePageNavBar: React.FC<LanguagePageNavBarProps> = ({
  onSettingsClick,
}) => {
  const { lives } = useLifeline();
  return (
    <div className='languagePageNavBar'>
      <Link to={"/learnlanguage"}>
        <p>
          <FaXmark size={24} />
        </p>
      </Link>
      <FaCog
        size={24}
        onClick={onSettingsClick}
        style={{ cursor: "pointer" }}
      />
      <ProgressBar />
      <div className='lives'>
        <FaHeart size={24} /> {lives}
      </div>
    </div>
  );
};

export default LanguagePageNavBar;
