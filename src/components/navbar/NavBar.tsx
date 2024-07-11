import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./navbar.css";

const NavBar = () => {
  const [showContent, setShowContent] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 10;
      if (scrollPosition > threshold) {
        setShowButton(true);
        setShowContent(false);
      } else {
        setShowContent(true);
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='navbar'>
      <div className='navbarlogo'>
        <h1>Ọmọlúàbí</h1>
      </div>
      {showContent && (
        <div className='navbardropdown'>
          <p>Yàn èdè kan</p>
          <FaChevronDown />
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
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
