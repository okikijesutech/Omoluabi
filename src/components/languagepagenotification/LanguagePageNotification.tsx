import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineFlag } from "react-icons/md";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./languagepagenotification.css";

interface NotificationProps {
  answerCorrect: boolean;
  hasNextQuestion: boolean;
  unitId: string;
  nextQuestionId: string | null;
  handleContinue: () => void;
}
const LanguagePageNotification: React.FC<NotificationProps> = ({
  answerCorrect,
  hasNextQuestion,
  unitId,
  nextQuestionId,
  handleContinue,
}) => {
  return (
    <div className='ctaconatiner correctNotificationContainer'>
      <div className='correctNotification'>
        {answerCorrect ? (
          <>
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
          </>
        ) : (
          <>
            <FaXmark size={48} color='#d84848' />
            <div style={{ color: "#d84848" }}>
              <p>Correct solution</p>
              <p>shushi, please</p>
            </div>
          </>
        )}
      </div>
      <div className='ctabtncontainer'>
        {hasNextQuestion && nextQuestionId && (
          <BtnPrimary
            title='continue'
            to={`/lesson/${unitId}/${nextQuestionId}`}
            bordercolor={answerCorrect ? "#93d333" : "#ee5555"}
            bgcolor={answerCorrect ? "#93d333" : "#ee5555"}
            shadow={answerCorrect ? "#79b933" : "#d848483"}
            hover={answerCorrect ? "#79b933" : "#d84848"}
            textColor='#131f24'
            onClick={handleContinue}
          />
        )}
      </div>
    </div>
  );
};

export default LanguagePageNotification;
