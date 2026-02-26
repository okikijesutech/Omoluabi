import { Link } from "react-router-dom";
import { ProgressBar } from "../../index";
import { FaCog, FaHeart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLifeline } from "../../../context/LifelineContext";
import "./LanguagePageNavBar.css";

interface LanguagePageNavBarProps {
  onSettingsClick: () => void;
  total: number;
  current: number;
}

const LanguagePageNavBar: React.FC<LanguagePageNavBarProps> = ({
  onSettingsClick,
  total,
  current,
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
      <ProgressBar
        value={current}
        max={total}
      />
      <div className='lives'>
        <FaHeart size={24} /> {lives}
      </div>
    </div>
  );
};

export default LanguagePageNavBar;
