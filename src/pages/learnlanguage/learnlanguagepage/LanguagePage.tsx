import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { Link } from "react-router-dom";
import img from "../../../assets/images/water-bottle.png";
import "./languagepage.css";
import { ProgressBar, BtnOptions, BtnPrimary } from "../../../components";
import { LessonModal } from "../../../modals";

const optionsData = [
  {
    img: "",
    answer: "water",
    number: "1",
  },
  {
    img: "",
    answer: "sushi",
    number: "2",
  },
  {
    img: "",
    answer: "rice",
    number: "3",
  },
  {
    img: "",
    answer: "tea",
    number: "4",
  },
];

const LanguagePage = () => {
  const [modalOn, setModalOn] = useState(false);

  const handlemodal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <div className='languagePageContainer'>
      <div className='languagePageNavBar'>
        <Link to={"/learnlanguage"}>
          <p>
            <FaXmark size={24} />
          </p>
        </Link>

        <FaCog size={24} onClick={handlemodal} style={{ cursor: "pointer" }} />

        <ProgressBar />
        <div className='lives'>
          <FaHeart size={24} /> 5
        </div>
      </div>
      <div className='questiondisplay'>
        <div>
          <h4>
            <IoSparkles size={18} />
            New Word
          </h4>
          <p>Which one is "sushi"?</p>
        </div>
        <div className='optionsdisplay'>
          {optionsData.map((option) => (
            <div key={option.number}>
              <BtnOptions
                img={img}
                answer={option.answer}
                number={option.number}
              />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className='ctaconatiner'>
        <div className='ctabtncontainer'>
          <BtnPrimary
            title='Skip'
            to=''
            bordercolor='#37464f'
            bgcolor=''
            shadow='#37464f'
            hover=''
            textColor='#52656d'
          />
        </div>
        <div className='ctabtncontainer'>
          <BtnPrimary
            title='Check'
            to=''
            bordercolor='#37464f'
            bgcolor=''
            shadow='#37464f'
            hover=''
            textColor='#52656d'
          />
        </div>
      </div>
      {modalOn && <LessonModal onClose={closeModal} />}
    </div>
  );
};

export default LanguagePage;
