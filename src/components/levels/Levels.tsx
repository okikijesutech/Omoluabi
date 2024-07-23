import LevelSection from "../levelsection/LevelSection";
import "./levels.css";

interface LevelsProps {
  sections: {
    id: number;
    name: string;
    unitcolor: string;
    unitshadow: string;
    sectionContent: { level: number; id: number }[];
  }[];
}

const Levels: React.FC<LevelsProps> = ({ sections }) => {
  const evenMarginValues = [80, 45, 15, 45, 80];
  const oddMarginValues = [20, 45, 80, 45, 20];

  return (
    <div className='level-container'>
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const marginValues = isEven ? evenMarginValues : oddMarginValues;
        return (
          <LevelSection
            key={section.id}
            section={section}
            marginValues={marginValues}
            isEven={isEven}
            index={index}
            levelBgColor={section.unitcolor}
            levelShadowColor={section.unitshadow}
          />
        );
      })}
    </div>
  );
};

export default Levels;
