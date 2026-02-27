import { useTranslation } from "react-i18next";
import { BtnPrimary } from "../../../components";
import heroImage from "../../../assets/images/hero.jpg";
import "./hero.css";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{t("header.title")}</h1>
          <p className="hero-subtitle">{t("header.subtitle")}</p>
          <div className="hero-cta">
            <BtnPrimary
              title={t("header.getStarted")}
              bgcolor="#58cc02"
              textColor="white"
              shadow="#46a302"
              hover="#61e002"
              bordercolor="#58cc02"
              to="/learnlanguage"
            />
            <BtnPrimary
              title={t("header.alreadyHaveAccount")}
              bgcolor="white"
              textColor="#1cb0f6"
              shadow="#e5e5e5"
              hover="#f7f7f7"
              bordercolor="#e5e5e5"
              to="/login"
            />
          </div>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Ọmọlúàbí Hero" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
