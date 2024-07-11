import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./navbar.css";

const NavBar = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [shadowBox, setShadowBox] = useState(false);

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
          <p>Yàn èdè kan</p>
          <FaChevronDown />
          <div className='dropdownmenu'>
            {[
              "Hausa",
              "Yoruba",
              "Igbo",
              "Fulfulde (Fulani)",
              "Kanuri",
              "Ibibio",
              "Tiv",
              "Ijaw",
              "Edo",
              "Urhobo",
              "Nupe",
              "Gbagyi",
              "Jukun",
              "Idoma",
              "Igala",
              "Berom",
              "Ebira",
              "Anang",
              "Efik",
              "Isoko",
            ].map((item) => (
              <Link to={""} className='link'>
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
      {showButton && (
        <div className='navbarbtn'>
          <BtnPrimary
            title={"Bẹ̀rẹ̀ Síṣe"}
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
