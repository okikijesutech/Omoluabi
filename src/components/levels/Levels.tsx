import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
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
  const [sPatternSections, setSPatternSections] = useState<Section[]>([]);

  useEffect(() => {
    const rearrangeInSPattern = (sections: Section[]) => {
      return sections.map((section) => {
        const content = [...section.sectionContent];
        const reorderedContent = [];

        while (content.length) {
          reorderedContent.push(content.shift()!);
          if (content.length) {
            reorderedContent.push(content.pop()!);
          }
        }

        return { ...section, sectionContent: reorderedContent };
      });
    };

    setSPatternSections(rearrangeInSPattern(sections));
  }, [sections]);

  return (
    <div className='levelcontainer'>
      <div className='levelscellcontainer'>
        {sPatternSections.map((section, index) => {
          const sectionContent =
            index % 2 === 0
              ? [...section.sectionContent].reverse()
              : section.sectionContent;

          return (
            <div key={section.id}>
              <div>
                {index !== 0 && (
                  <div className='levelsheading'>
                    <hr />
                    {section.name}
                    <hr />
                  </div>
                )}
              </div>
              <div>
                <div className='levelscellwrapper'>
                  {sectionContent.map((content) => (
                    <div key={content.id} className='levelscell'>
                      <FaStar color='white' size={48} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Levels;
