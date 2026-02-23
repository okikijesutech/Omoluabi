import React from "react";
import LevelCell from "../LevelCell/LevelCell";
import LevelImage from "../LevelImg/LevelImg";
import { useQuiz } from "../../context/QuizContext";
import "./levelSection.css";

interface LevelSectionProps {
  section: {
    id: number;
    name: string;
    unitcolor: string;
    unitshadow: string;
    sectionContent: { level: number; id: number }[];
  };
  marginValues: number[];
  isEven: boolean;
  index: number;
}

const LevelSection: React.FC<LevelSectionProps> = ({
  section,
  marginValues,
  isEven,
  index,
}) => {
  const { state } = useQuiz();

  return (
    <div className={`level-section ${isEven ? "even" : "odd"}`}>
      {index !== 0 && (
        <div className='levels-heading'>
          <hr className='horizontal-line' />
          <span className='levels-heading-text'>{section.name}</span>
          <hr className='horizontal-line' />
        </div>
      )}
      
      <div className='level-content-container'>
        <LevelImage />
        <div className='level-cells'>
          {section.sectionContent.map((content, contentIndex) => (
            <LevelCell
              key={content.id}
              sectionId={section.id}
              contentId={content.id}
              marginLeft={marginValues[contentIndex % 5]}
              clickable={state.answeredQuestions[contentIndex]}
              bgColor={section.unitcolor}
              shadowColor={section.unitshadow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSection;
