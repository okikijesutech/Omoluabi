import { useState, useMemo } from "react";
import { GuideBook, BtnPrimary, Levels } from "../../../components";
import { useContent } from "../../../hooks/useContent";
import { Section, LevelsSection } from "../../../types/content";
import "./languagelanding.css";

const LanguageLanding = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { content: rawSections, loading } = useContent<Section[]>("/content/yoruba/index.json");

  const sections = useMemo(() => {
    if (!rawSections) return [];
    
    const grouped = rawSections.reduce<Record<string, Section[]>>(
      (acc, section) => {
        if (!acc[section.section]) {
          acc[section.section] = [];
        }
        acc[section.section].push(section);
        return acc;
      },
      {}
    );
    return Object.values(grouped);
  }, [rawSections]);

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

  const currentSectionData: LevelsSection[] = useMemo(() => {
    return sections[currentPage]?.map((section, index) => ({
      ...section,
      id: index + 1,
      name: section.unitname,
      sectionContent: section.sectionContent || [],
    })) || [];
  }, [sections, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (sections.length === 0 || currentSectionData.length === 0) {
    return <div>No content available yet. Stay tuned!</div>;
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
