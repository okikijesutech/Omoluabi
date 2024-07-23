import LevelCells from "../levelcells/LevelCells";
import LevelImage from "../levelimg/LevelImg";
import "./levelContent.css";

interface LevelContentProps {
  sectionId: number;
  sectionContent: { level: number; id: number }[];
  marginValues: number[];
  isEven: boolean;
  levelBgColor: string;
  levelShadowColor: string;
}

const LevelContent: React.FC<LevelContentProps> = ({
  sectionId,
  sectionContent,
  marginValues,
  isEven,
  levelBgColor,
  levelShadowColor,
}) => {
  return (
    <div className={`level-content ${isEven ? "even" : "odd"}`}>
      <LevelImage />
      <LevelCells
        sectionId={sectionId}
        sectionContent={sectionContent}
        marginValues={marginValues}
        levelBgColor={levelBgColor}
        levelShadowColor={levelShadowColor}
      />
    </div>
  );
};

export default LevelContent;
