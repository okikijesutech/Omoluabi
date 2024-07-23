import { useQuiz } from "../../context/QuizContext";
import LevelCell from "../levelcell/LevelCell";
import "./levelCells.css";

interface LevelCellsProps {
  sectionId: number;
  sectionContent: { level: number; id: number }[];
  marginValues: number[];
  levelBgColor: string;
  levelShadowColor: string;
}

const LevelCells: React.FC<LevelCellsProps> = ({
  sectionId,
  sectionContent,
  marginValues,
  levelBgColor,
  levelShadowColor,
}) => {
  const { state } = useQuiz();

  return (
    <div className='level-cells'>
      {sectionContent.map((content, contentIndex) => (
        <LevelCell
          key={content.id}
          sectionId={sectionId}
          contentId={content.id}
          marginLeft={marginValues[contentIndex % 5]}
          clickable={state.answeredQuestions[contentIndex]}
          bgColor={levelBgColor}
          shadowColor={levelShadowColor}
        />
      ))}
    </div>
  );
};

export default LevelCells;
