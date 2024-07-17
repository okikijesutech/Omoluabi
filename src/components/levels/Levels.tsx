import { FaStar } from "react-icons/fa";
import abc from "../../assets/images/abc.jpg";
import "./levels.css";

interface SectionContent {
  level: number;
  id: number;
}

interface Section {
  id: number;
  name: string;
  sectionContent: SectionContent[];
}

interface LevelsProps {
  sections: Section[];
}

const Levels: React.FC<LevelsProps> = ({ sections }) => {
  const marginValues = [60, 35, 15, 35, 60];

  return (
    <div className='levelcontainer'>
      <div className='levelscellcontainer'>
        {sections.map((section, index) => (
          <div key={section.id}>
            <div>
              {index !== 0 && (
                <div className='levelsheading'>
                  <hr className='horizontal-line' />
                  <span className='levelsheading-text'>{section.name}</span>
                  <hr className='horizontal-line' />
                </div>
              )}
            </div>
            <div className='levelscelldiv'>
              <div className='levelscellwrapper'>
                {section.sectionContent.map((content, contentIndex) => (
                  <div
                    key={content.id}
                    className='levelscell'
                    style={{
                      marginLeft: `${marginValues[contentIndex % 5]}px`,
                    }}
                  >
                    <FaStar color='#52656d' size={36} />
                  </div>
                ))}
              </div>
              <div className='levelscellimg'>
                <img src={abc} alt='' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
