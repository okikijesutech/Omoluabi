import LevelCells from "../levelcells/LevelCells";
import LevelImage from "../levelimg/LevelImg";
import "./levelContent.css";

interface LevelContentProps {
  sectionId: number;
  sectionContent: { level: number; id: number }[];
  marginValues: number[];
  isEven: boolean;
}

const LevelContent: React.FC<LevelContentProps> = ({
  sectionId,
  sectionContent,
  marginValues,
  isEven,
}) => {
  return (
    <div className={`level-content ${isEven ? "even" : "odd"}`}>
      <LevelImage />
      <LevelCells
        sectionId={sectionId}
        sectionContent={sectionContent}
        marginValues={marginValues}
      />
    </div>
  );
};

export default LevelContent;
