import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import "./lessonmodal.css";

interface LessonModalProps {
  onClose: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ onClose }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='modalcontainer'>
      <div className='modal'>
        <div className='modalheader'>
          <h2>Settings</h2>
          <FaXmark className='close-btn' onClick={onClose} />
        </div>
        <hr />
        <div className='modalcontent'>
          <p>
            Show Pronunciation
            <span
              className={`toggle-btn ${toggle ? "active" : ""}`}
              onClick={handleToggle}
            ></span>
          </p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LessonModal;
