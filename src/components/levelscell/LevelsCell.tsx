import { FaStar } from "react-icons/fa";
import "./levelscell.css";

interface LevelsCellProps {
  id: number;
}

const LevelsCell: React.FC<LevelsCellProps> = ({ id }) => {
  return (
    <div key={id} className='levelscellcontainer'>
      <FaStar color='white' size={48} />
    </div>
  );
};

export default LevelsCell;
