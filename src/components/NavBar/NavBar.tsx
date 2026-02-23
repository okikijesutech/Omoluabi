import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import BtnPrimary from "../BtnPrimary/BtnPrimary";
import { LANGUAGES } from "../../constants/navigationData";
import "./NavBar.css";

const LanguageDropdown = ({ onLanguageChange }: { onLanguageChange: (code: string) => void }) => {
  const { t } = useTranslation();
  return (
    <div className='navbardropdown'>
      <p>{t("selectLanguage")}</p>
      <FaChevronDown />
      <div className='dropdownmenu'>
        {LANGUAGES.map((language) => (
          <span
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className='link'
          >
            {language.name}
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
  };

  return (
    <div
      className='navbar'
      style={{ boxShadow: shadowBox ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "none" }}
    >
      <div className='navbarlogo'>
        <h1>Ọmọlúàbí</h1>
      </div>
      
      {showContent && <LanguageDropdown onLanguageChange={changeLanguage} />}
      
      {showButton && (
        <div className='navbarbtn'>
          <BtnPrimary
            title={t("header.getStarted")}
            bgcolor={"green"}
            textColor={"white"}
            shadow={"#006400"}
            hover={"#388E3C"}
            bordercolor='green'
            to='/signup'
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
