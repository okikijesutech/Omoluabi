import { FaStar, FaCheck, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLifeline } from "../../../../context/LifelineContext";
import "./levelCell.css";
import { useState } from "react";
import { Modal } from "../../../../modals";

interface LevelCellProps {
  language: string;
  category: string;
  lessonId: string;
  marginLeft: number;
  clickable: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  bgColor: string;
  shadowColor: string;
}

const LevelCell: React.FC<LevelCellProps> = ({
  language,
  category,
  lessonId,
  marginLeft,
  clickable,
  isCompleted = false,
  isActive = false,
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

  const getIcon = () => {
    if (isCompleted) return <FaCheck color='#ffffff' size={28} />;
    if (isActive) return <FaStar color='#ffffff' size={32} />;
    if (!clickable) return <FaLock color='#afafaf' size={24} />;
    return <FaStar color='#ffffff' size={32} />;
  };

  return (
    <>
      <div
        className={`level-cell-wrapper`}
        style={{ "--ml": `${marginLeft}px` } as React.CSSProperties}
      >
        <div className={`level-cell-container ${isActive ? "is-active" : ""}`}>
          {isActive && (
            <svg className="progress-ring" width="92" height="92">
              <circle
                className="progress-ring__circle"
                stroke="white"
                strokeWidth="6"
                fill="transparent"
                r="40"
                cx="46"
                cy="46"
                strokeDasharray="251.2 251.2"
                strokeDashoffset="251.2"
              />
            </svg>
          )}

          <div
            className={`level-cell ${!clickable ? "disabled" : ""} ${isCompleted ? "completed" : ""}`}
            style={
              {
                backgroundColor: clickable ? bgColor : "#e5e5e5",
                boxShadow: clickable ? `0 8px 0 ${shadowColor}` : "0 8px 0 #afafaf",
              } as React.CSSProperties
            }
            onClick={handleClick}
          >
            {clickable && lives > 0 ? (
              <Link to={`/lesson/${language}/${category}/${lessonId}/0`} className='level-cell-link'>
                {getIcon()}
              </Link>
            ) : (
              <div className="level-cell-link">{getIcon()}</div>
            )}
          </div>
        </div>
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
