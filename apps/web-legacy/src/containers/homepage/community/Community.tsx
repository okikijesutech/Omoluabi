import { useTranslation } from "react-i18next";
import { BtnPrimary } from "../../../components";
import { FaGithub } from "react-icons/fa";
import "./community.css";

const Community = () => {
  const { t } = useTranslation();

  return (
    <section className="community-section">
      <div className="community-content">
        <div className="community-icon">
          <FaGithub />
        </div>
        <h2 className="community-title">{t("community.title")}</h2>
        <p className="community-desc">{t("community.desc")}</p>
        <div className="community-action">
          <BtnPrimary
            title={t("community.cta")}
            bgcolor="#333"
            textColor="white"
            shadow="#000"
            hover="#444"
            bordercolor="#333"
            onClick={() => window.open("https://github.com/okikijesutech/Omoluabi", "_blank")}
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
