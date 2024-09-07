import { useEffect, useState } from "react";
import { GuideBook, BtnPrimary, Levels } from "../../../components";
import sectionsData from "../../../dummydata/sections.json";
import "./languagelanding.css";

type SectionType = {
  section: string;
  unit: string;
  unitname: string;
  unitcolor: string;
  unitshadow: string;
  sectionContent?: { level: number; id: number }[];
};

type LevelsSectionType = {
  id: number;
  unit: string;
  name: string;
  unitcolor: string;
  unitshadow: string;
  section: string;
  sectionContent: { level: number; id: number }[];
};

const LanguageLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sections, setSections] = useState<SectionType[][]>([]);

  useEffect(() => {
    const groupedSections = sectionsData.reduce<Record<string, SectionType[]>>(
      (acc, section) => {
        if (!acc[section.section]) {
          acc[section.section] = [];
        }
        acc[section.section].push(section);
        return acc;
      },
      {}
    );

    setSections(Object.values(groupedSections));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    if (currentPage < sections.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentSectionData: LevelsSectionType[] =
    sections[currentPage]?.map((section, index) => ({
      id: index + 1,
      name: section.unitname,
      unit: section.unit,
      unitcolor: section.unitcolor,
      unitshadow: section.unitshadow,
      section: section.section,
      sectionContent: section.sectionContent || [],
    })) || [];

  if (sections.length === 0 || currentSectionData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='languagelandingcontainer'>
      <div className='guidebookcontainer'>
        <GuideBook
          section={currentSectionData[0].section}
          unit={currentSectionData[0].unit}
          unitname={currentSectionData[0].name}
          unitcolor={currentSectionData[0].unitcolor}
          unitshadow={currentSectionData[0].unitshadow}
        />
      </div>
      <div>
        <Levels sections={currentSectionData} />
      </div>
      {scrollY > 300 && (
        <button onClick={scrollToTop} className='scroll-to-top-btn'>
          ↑ Top
        </button>
      )}
      <div className='newsectioncard'>
        <h4>Section {currentPage + 1}</h4>
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
            onClick={handleNextPage}
          />
        </div>
        <div className='pagination'>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className='pagination-btn'
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageLanding;
