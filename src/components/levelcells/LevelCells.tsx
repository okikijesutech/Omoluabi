import LevelCell from "../levelcell/LevelCell";
import "./levelCells.css";

interface LevelCellsProps {
  sectionId: number;
  sectionContent: { level: number; id: number }[];
  marginValues: number[];
}

const LevelCells: React.FC<LevelCellsProps> = ({
  sectionId,
  sectionContent,
  marginValues,
}) => {
  return (
    <div className='level-cells'>
      {sectionContent.map((content, contentIndex) => (
        <LevelCell
          key={content.id}
          sectionId={sectionId}
          contentId={content.id}
          marginLeft={marginValues[contentIndex % 5]}
        />
      ))}
    </div>
  );
};

export default LevelCells;
