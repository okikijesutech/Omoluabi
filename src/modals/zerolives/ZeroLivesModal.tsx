import React from "react";
import { useNavigate } from "react-router-dom";
import "./zerolivesmodal.css"; // Create appropriate CSS

const ZeroLivesModal: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/learnlanguage"); // Navigate back to /learnlanguage
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>No Lives Left</h2>
        <p>You have no lives left. The lesson page is inaccessible.</p>
        <button onClick={handleNavigate}>Go Back to Learn Language</button>
      </div>
    </div>
  );
};

export default ZeroLivesModal;
