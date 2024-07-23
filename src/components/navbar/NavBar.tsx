import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./navbar.css";

const NavBar = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [shadowBox, setShadowBox] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setShowButton(true);
        setShowContent(false);
      } else {
        setShowContent(true);
        setShowButton(false);
      }

      if (scrollPosition > 150) {
        setShadowBox(true);
      } else {
        setShadowBox(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const languages = [
    { name: "Hausa", code: "ha" },
    { name: "Yoruba", code: "yo" },
    { name: "Igbo", code: "ig" },
    { name: "Fulfulde (Fulani)", code: "ff" },
    { name: "Kanuri", code: "kr" },
    { name: "Ibibio", code: "ib" },
    { name: "Tiv", code: "tv" },
    { name: "Ijaw", code: "ij" },
    { name: "Edo", code: "ee" },
    { name: "Urhobo", code: "ur" },
    { name: "Nupe", code: "nu" },
    { name: "Gbagyi", code: "gb" },
    { name: "Jukun", code: "ju" },
    { name: "Idoma", code: "id" },
    { name: "Igala", code: "ig" },
    { name: "Berom", code: "be" },
    { name: "Ebira", code: "eb" },
    { name: "Anang", code: "an" },
    { name: "Efik", code: "ef" },
    { name: "Isoko", code: "is" },
  ];
  return (
    <div
      className='navbar'
      style={{ boxShadow: shadowBox ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "none" }}
    >
      <div className='navbarlogo'>
        <h1>Ọmọlúàbí</h1>
      </div>
      {showContent && (
        <div className='navbardropdown'>
          <p>{t("selectLanguage")}</p>
          <FaChevronDown />
          <div className='dropdownmenu'>
            {languages.map((language) => (
              <span
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className='link'
              >
                {language.name}
              </span>
            ))}
          </div>
        </div>
      )}
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
