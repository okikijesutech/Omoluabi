import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { Link } from "react-router-dom";
import img from "../../../assets/images/water-bottle.png";
import "./languagepage.css";
import { FaCheckCircle } from "react-icons/fa";
import { ProgressBar, BtnOptions, BtnPrimary } from "../../../components";
import { LessonModal } from "../../../modals";
import sectionData from "../../../dummydata/sections.json";
import { MdOutlineFlag } from "react-icons/md";

const LanguagePage = () => {
  const [modalOn, setModalOn] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { unitId, questionId } = useParams<{
    unitId: string;
    questionId: string;
  }>();

  const handleModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  const handleContinue = () => {
    setAnswerCorrect(false);
    setHasAnswered(false);
    setSelectedOption(null);
  };

  const checkAnswer = () => {
    setHasAnswered(true);
    const section = sectionData.find((sec) => sec.id === Number(unitId));
    const question = section?.sectionContent.find(
      (q) => q.id === Number(questionId)
    );
    if (question && selectedOption !== null) {
      const correctAnswer = question.correctAnswer;
      if (selectedOption === Number(correctAnswer)) {
        setAnswerCorrect(true);
      } else {
        setAnswerCorrect(false);
      }
    }
  };

  // Find the specific question data based on the unitId and questionId
  const section = sectionData.find((sec) => sec.id === Number(unitId));
  const question = section?.sectionContent.find(
    (q) => q.id === Number(questionId)
  );

  if (!section || !question) {
    console.error(
      `Question not found: unitId=${unitId}, questionId=${questionId}`
    );
    return <div>Question not found</div>;
  }

  const questionIndex = section?.sectionContent.findIndex(
    (q) => q.id === Number(questionId)
  );

  const hasNextQuestion =
    questionIndex !== undefined &&
    questionIndex < section?.sectionContent.length - 1;
  const nextQuestionId = hasNextQuestion
    ? section?.sectionContent[questionIndex + 1]?.id.toString()
    : null;

  return (
    <div className='languagePageContainer'>
      <div className='languagePageNavBar'>
        <Link to={"/learnlanguage"}>
          <p>
            <FaXmark size={24} />
          </p>
        </Link>
        <FaCog size={24} onClick={handleModal} style={{ cursor: "pointer" }} />
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
          <p>{question.question}</p>
        </div>
        <div className='optionsdisplay'>
          {question.options.map((option) => (
            <div
              key={option.number}
              onClick={() => setSelectedOption(Number(option.number))}
            >
              <BtnOptions
                img={img}
                answer={option.answer}
                number={Number(option.number)}
                isSelected={selectedOption === Number(option.number)}
              />
            </div>
          ))}
        </div>
      </div>
      {hasAnswered ? (
        <>
          {answerCorrect ? (
            <div className='ctaconatiner correctNotificationContainer'>
              <div className='correctNotification'>
                <FaCheckCircle size={48} />
                <div>
                  <p>The Answer is Correct</p>
                  <p>
                    <Link to={""}>
                      <MdOutlineFlag />
                      Report
                    </Link>
                  </p>
                </div>
              </div>
              <div className='ctabtncontainer'>
                {hasNextQuestion && (
                  <BtnPrimary
                    title='continue'
                    to={`/lesson/${unitId}/${nextQuestionId}`}
                    bordercolor='#93d333'
                    bgcolor='#93d333'
                    shadow='#79b933'
                    hover='#79b933'
                    textColor='#131f24'
                    onClick={handleContinue}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className='ctaconatiner correctNotificationContainer'>
              <div className='correctNotification'>
                <FaXmark size={48} color='#d84848' />
                <div style={{ color: "#d84848" }}>
                  <p>Correct solution</p>
                  <p>shushi, please</p>
                </div>
              </div>
              <div className='ctabtncontainer'>
                {hasNextQuestion && (
                  <BtnPrimary
                    title='continue'
                    to={`/lesson/${unitId}/${nextQuestionId}`}
                    bordercolor='#ee5555'
                    bgcolor='#ee5555'
                    shadow='#d848483'
                    hover='#d84848'
                    textColor='#131f24'
                    onClick={handleContinue}
                  />
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <hr />
          <div className='ctaconatiner'>
            <div className='ctabtncontainer'>
              <BtnPrimary
                title='Skip'
                to={`/lesson/${unitId}/${nextQuestionId}`}
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
                bordercolor={`${selectedOption ? "#93d333" : "#37464f"}`}
                bgcolor={`${selectedOption ? "#93d333" : "#37464f"}`}
                shadow={`${selectedOption ? "#79b933" : "#37464f"}`}
                hover='#79b933'
                textColor={`${selectedOption ? "#131f24" : "#52656d"}`}
                disabled={selectedOption === null}
                onClick={checkAnswer}
              />
            </div>
          </div>
        </>
      )}

      {modalOn && <LessonModal onClose={closeModal} />}
    </div>
  );
};

export default LanguagePage;
