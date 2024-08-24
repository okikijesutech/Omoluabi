import { useTranslation } from "react-i18next";
import { BtnPrimary } from "../../../components";
import hero from "../../../assets/images/hero.jpg";
import "./header.css";

const Header = () => {
  const { t } = useTranslation();
  return (
    <div className='header'>
      <div className='headerimage'>
        <img src={hero} alt='' />
      </div>
      <div className='headercontent'>
        <h1 style={{ color: "black" }}>{t("header.title")}</h1>
        <div className='btncontainer'>
          <BtnPrimary
            title={t("header.getStarted")}
            bgcolor={"green"}
            textColor={"white"}
            shadow={"#006400"}
            hover={"#388E3C"}
            bordercolor='green'
            to='/register'
          />
          <BtnPrimary
            title={t("header.alreadyHaveAccount")}
            bgcolor={"white"}
            textColor={"#1cb0f6"}
            shadow={"#cccccc"}
            hover={"gray"}
            bordercolor='#cccccc'
            to='/learnlanguage'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
