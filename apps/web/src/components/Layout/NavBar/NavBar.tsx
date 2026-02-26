import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { BtnPrimary } from "../../index";
import { LANGUAGES } from "../../../constants/navigationData";
import "./NavBar.css";

const LanguageDropdown = ({ onLanguageChange }: { onLanguageChange: (code: string) => void }) => {
  const { t } = useTranslation();
  return (
    <div className='navbardropdown hide-mobile'>
      <p>{t("selectLanguage")}</p>
      <FaChevronDown />
      <div className='dropdownmenu'>
        {LANGUAGES.map((language) => (
          <span
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className='link'
          >
            {language.code.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [shadowBox, setShadowBox] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 300);
      setShowContent(scrollPosition <= 300);
      setShadowBox(scrollPosition > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  return (
    <div
      className='navbar'
      style={{ boxShadow: shadowBox ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "none" }}
    >
      <div className='navbarlogo'>
        <h1>Ọmọlúàbí</h1>
      </div>
      
      <div className='nav-content-desktop hide-mobile'>
        {showContent && <LanguageDropdown onLanguageChange={changeLanguage} />}
        
        {showButton && (
          <div className='navbarbtn'>
            <BtnPrimary
              title={t("header.getStarted")}
              bgcolor="var(--primary-green, green)"
              textColor="white"
              shadow="var(--primary-green-dark, #006400)"
              hover="var(--primary-green-light, #388E3C)"
              bordercolor="var(--primary-green, green)"
              to='/learnlanguage'
            />
          </div>
        )}
      </div>

      <div className='hamburger-menu show-mobile' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {isMenuOpen && (
        <div className='mobile-overlay'>
          <div className='mobile-languages'>
            <h3>{t("selectLanguage")}</h3>
            <div className='language-grid'>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`language-btn ${i18n.language === language.code ? 'active' : ''}`}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
          <div className='mobile-cta'>
            <BtnPrimary
              title={t("header.getStarted")}
              bgcolor={"green"}
              textColor={"white"}
              shadow={"#006400"}
              hover={"#388E3C"}
              bordercolor='green'
              to='/learnlanguage'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
