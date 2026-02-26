import { useTranslation } from "react-i18next";
import { FaGraduationCap, FaCode, FaUsers } from "react-icons/fa";
import "./features.css";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaGraduationCap />,
      title: t("features.gamified.title"),
      desc: t("features.gamified.desc"),
      color: "#58cc02"
    },
    {
      icon: <FaCode />,
      title: t("features.opensource.title"),
      desc: t("features.opensource.desc"),
      color: "#1cb0f6"
    },
    {
      icon: <FaUsers />,
      title: t("features.modern.title"),
      desc: t("features.modern.desc"),
      color: "#ff9600"
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-icon" style={{ backgroundColor: feature.color }}>
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
