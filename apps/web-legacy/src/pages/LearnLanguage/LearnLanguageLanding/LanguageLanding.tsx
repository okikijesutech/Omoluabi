import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DynamicUnitHeader, LevelSection, Loader } from "../../../components";
import { useCourse } from "../../../context/CourseContext";
import { LEVEL_LAYOUT } from "../../../constants/levelConstants";
import "./languagelanding.css";

const LanguageLanding = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { course, loading, loadCourse, error } = useCourse();
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const activeUnit = course?.units.find(u => u.id === activeUnitId) || course?.units[0] || null;

  useEffect(() => {
    loadCourse(lang || "yoruba");
  }, [lang]);

  useEffect(() => {
    if (course && course.units.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-unit-id");
              if (id) setActiveUnitId(id);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" }
      );

      const elements = document.querySelectorAll(".unit-scroll-wrapper");
      elements.forEach((el) => observerRef.current?.observe(el));
    }

    return () => observerRef.current?.disconnect();
  }, [course]);

  if (loading) return <Loader />;
  if (error) return <div className="error-container">Error loading course: {error}</div>;
  if (!course) return <div className="no-content">No course selected.</div>;

  return (
    <div 
      className='languagelandingcontainer' 
      style={{ "--path-bg": activeUnit ? `${activeUnit.color}15` : "#ffffff" } as React.CSSProperties}
    >
      {activeUnit && (
        <DynamicUnitHeader 
          title={`Unit ${activeUnit.number}`}
          subtitle={activeUnit.title}
          themeColor={activeUnit.color}
          shadowColor={activeUnit.shadowColor || "#00000020"}
        />
      )}
      
      <div className="learning-path" style={{ marginTop: activeUnit ? "100px" : "40px" }}>
        {course.units.map((unit, index) => {
          const isEven = index % 2 === 0;
          const marginValues = isEven ? LEVEL_LAYOUT.EVEN_MARGINS : LEVEL_LAYOUT.ODD_MARGINS;
          
          return (
            <div 
              key={unit.id} 
              className="unit-scroll-wrapper" 
              data-unit-id={unit.id}
            >
              <div className="unit-container">
                <div className="unit-levels">
                  <LevelSection 
                    language={course.language.toLowerCase()} 
                    unit={unit} 
                    marginValues={marginValues}
                    isEven={isEven}
                    index={index}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className='footer-status'>
        <p>You're making great progress! Keep it up!</p>
      </div>
    </div>
  );
};

export default LanguageLanding;
