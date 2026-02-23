import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLifeline } from "../../context/LifelineContext";
import "./levelCell.css";
import { useState } from "react";
import { Modal } from "../../modals";

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
  const { lives } = useLifeline();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (lives === 0) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
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
        onClick={handleClick}
      >
        {clickable && lives > 0 ? (
          <Link to={`/lesson/${sectionId}/${contentId}`}>
            <FaStar color='#ffffff' size={36} />
          </Link>
        ) : (
          <FaStar color='#52656d' size={36} />
        )}
      </div>
      {isModalOpen && (
        <Modal
          message='Lifeline depleted! Please wait for your lives to regenerate.'
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default LevelCell;
