import { Link } from "react-router-dom";
import imagesMap from "../../imagesMap";
import "./languagecard.css";

interface LanguageCardProps {
  image: string;
  language: string;
  subs: string;
  link: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  image,
  language,
  subs,
  link,
}) => {
  return (
    <Link to={link} className='languagecardcontainer'>
      <div className='languagecardimg'>
        <img src={imagesMap[image]} alt='' />
      </div>
      <div className='languagecardtext'>
        <h3>{language}</h3>
        <p>{subs}</p>
      </div>
    </Link>
  );
};

export default LanguageCard;
