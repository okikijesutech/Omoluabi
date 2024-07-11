import { BtnPrimary } from "../../../components";
import hero from "../../../assets/images/hero.jpg";
import "./header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className='headerimage'>
        <img src={hero} alt='' />
      </div>
      <div className='headercontent'>
        <h1>Ìlànà tí a fẹ́ bí ìgbagbọ, àlàáfíà àti ń ṣe ẹ̀kọ̀ àìlò.</h1>
        <div className='btncontainer'>
          <BtnPrimary
            title={"Bẹ̀rẹ̀ Síṣe"}
            bgcolor={"green"}
            textColor={"white"}
            shadow={"#006400"}
            hover={"#388E3C"}
            bordercolor='green'
            to='/signup'
          />
          <BtnPrimary
            title={"Mo ti ní àkọwé tó tọ́"}
            bgcolor={"white"}
            textColor={"#1cb0f6"}
            shadow={"#cccccc"}
            hover={"gray"}
            bordercolor='#cccccc'
            to='/login'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
