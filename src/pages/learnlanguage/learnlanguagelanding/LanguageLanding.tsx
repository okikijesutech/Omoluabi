import { useEffect, useState } from "react";
import { GuideBook, BtnPrimary, Levels } from "../../../components";
import sectionsData from "../../../dummydata/sections.json";
import "./languagelanding.css";

const LanguageLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getGuideBookContent = () => {
    const index = Math.floor(scrollY / 600) % sectionsData.length;
    return sectionsData[index];
  };

  const { section, unit, unitname, unitcolor, unitshadow } =
    getGuideBookContent();

  return (
    <div className='languagelandingcontainer'>
      <div className='guidebookcontainer'>
        <GuideBook
          section={section}
          unit={unit}
          unitname={unitname}
          unitcolor={unitcolor}
          unitshadow={unitshadow}
        />
      </div>
      <div>
        <Levels sections={sectionsData} />
      </div>
      <div className='newsectioncard'>
        <h4>Section 2</h4>
        <p>Learn words, phrases, and grammar concepts for basic interactions</p>
        <div className='newsectioncardbtn'>
          <BtnPrimary
            title='Next Section'
            bgcolor=''
            bordercolor=''
            shadow='#46a302'
            hover='#7fb42a'
            to=''
            textColor='white'
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageLanding;
