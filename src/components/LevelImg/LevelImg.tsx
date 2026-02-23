import abc from "../../assets/images/abc.jpg";
import "./levelImg.css";

const LevelImage: React.FC = () => {
  return (
    <div className='level-img'>
      <img src={abc} alt='Level' />
    </div>
  );
};

export default LevelImage;
