import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./levelCell.css";

interface LevelCellProps {
  sectionId: number;
  contentId: number;
  marginLeft: number;
  clickable: boolean;
  bgColor: string;
  shadowColor: string;
}

const LevelCell: React.FC<LevelCellProps> = ({
  sectionId,
  contentId,
  marginLeft,
  clickable,
  bgColor,
  shadowColor,
}) => {
  return (
    <div
      className={`level-cell ${clickable ? "" : "disabled"}`}
      style={
        clickable
          ? {
              marginLeft: `${marginLeft}px`,
              backgroundColor: `${bgColor}`,
              boxShadow: `0 8px 0 ${shadowColor}`,
            }
          : { marginLeft: `${marginLeft}px` }
      }
    >
      {clickable ? (
        <Link to={`/lesson/${sectionId}/${contentId}`}>
          <FaStar color='#ffffff' size={36} />
        </Link>
      ) : (
        <FaStar color='#52656d' size={36} />
      )}
    </div>
  );
};

export default LevelCell;
