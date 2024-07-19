import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./levelCell.css";

interface LevelCellProps {
  sectionId: number;
  contentId: number;
  marginLeft: number;
}

const LevelCell: React.FC<LevelCellProps> = ({
  sectionId,
  contentId,
  marginLeft,
}) => {
  return (
    <div className='level-cell' style={{ marginLeft: `${marginLeft}px` }}>
      <Link to={`/lesson/${sectionId}/${contentId}`}>
        <FaStar color='#52656d' size={36} />
      </Link>
    </div>
  );
};

export default LevelCell;
