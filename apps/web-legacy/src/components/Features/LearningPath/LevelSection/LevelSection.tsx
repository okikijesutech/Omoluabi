import React from "react";
import LevelCell from "../LevelCell/LevelCell";
import LevelImage from "../LevelImage/LevelImage";
import PathLine from "../PathLine/PathLine";
import { useCourse } from "../../../../context/CourseContext";
import { usePathCalculation } from "../../../../hooks/usePathCalculation";
import "./levelSection.css";

import { Unit } from "../../../../core/types";

interface LevelSectionProps {
  language: string;
  unit: Unit;
  marginValues: number[];
  isEven: boolean;
  index: number;
}

const LevelSection: React.FC<LevelSectionProps> = ({
  language,
  unit,
  marginValues,
  isEven,
  index,
}) => {
  const { currentProgress } = useCourse(); // Assuming useCourse is available or passed
  const { points: pathPoints } = usePathCalculation(
    unit.lessons.length,
    marginValues
  );

  return (
    <div className={`level-section ${isEven ? "even" : "odd"}`}>
      {index !== 0 && (
        <div className='levels-heading'>
          <hr className='horizontal-line' />
          <span className='levels-heading-text'>{unit.title}</span>
          <hr className='horizontal-line' />
        </div>
      )}
      
      <div className='level-content-container'>
        <div className='level-cells'>
          <PathLine points={pathPoints} />
          {unit.lessons.map((lessonId, contentIndex) => {
            const showSocial = contentIndex % 4 === 1;
            const side = isEven ? (contentIndex % 8 < 4 ? 'left' : 'right') : (contentIndex % 8 < 4 ? 'right' : 'left');
            const isCompleted = currentProgress?.completedLessons.includes(lessonId);
            const isActive = !isCompleted && (contentIndex === 0 || currentProgress?.completedLessons.includes(unit.lessons[contentIndex - 1]));

            return (
              <div key={lessonId} className="level-row">
                {showSocial && side === 'left' && <LevelImage side="left" />}
                <LevelCell
                  language={language}
                  category={"basics"} // Default for now, should be part of lesson metadata
                  lessonId={lessonId}
                  marginLeft={marginValues[contentIndex % marginValues.length]}
                  clickable={Boolean(isActive || isCompleted)}
                  isCompleted={Boolean(isCompleted)}
                  isActive={Boolean(isActive)}
                  bgColor={unit.color}
                  shadowColor={unit.shadowColor}
                />
                {showSocial && side === 'right' && <LevelImage side="right" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSection;
