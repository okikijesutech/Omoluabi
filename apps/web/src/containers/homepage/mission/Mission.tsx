import { useTranslation } from "react-i18next";
import schoolImage from "../../../assets/images/school.jpg";
import "./mission.css";

const Mission = () => {
  const { t } = useTranslation();

  return (
    <section className="mission-section">
      <div className="mission-content">
        <div className="mission-image-container">
          <img src={schoolImage} alt="Our Mission" className="mission-image" />
        </div>
        <div className="mission-text">
          <h2 className="mission-title">{t("mission.title")}</h2>
          <p className="mission-desc">{t("mission.desc")}</p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
