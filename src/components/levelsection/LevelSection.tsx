import LevelContent from "../levelcontent/LevelContent";
import "./levelSection.css";

interface LevelSectionProps {
  section: {
    id: number;
    name: string;
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
  return (
    <div className={`level-section ${isEven ? "even" : "odd"}`}>
      {index !== 0 && (
        <div className='levels-heading'>
          <hr className='horizontal-line' />
          <span className='levels-heading-text'>{section.name}</span>
          <hr className='horizontal-line' />
        </div>
      )}
      <LevelContent
        sectionId={section.id}
        sectionContent={section.sectionContent}
        marginValues={marginValues}
        isEven={isEven}
      />
    </div>
  );
};

export default LevelSection;
