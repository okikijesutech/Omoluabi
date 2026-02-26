import { BtnPrimary } from "../../../index";
import "./ControlButtons.css";

interface ControlButtonsProps {
  selectedOption: string | number | null;
  unitId: string;
  nextQuestionId: string | null;
  checkAnswer: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  selectedOption,
  unitId,
  nextQuestionId,
  checkAnswer,
}) => {
  return (
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
            bordercolor={selectedOption ? "var(--primary-green, #008751)" : "#37464f"}
            bgcolor={selectedOption ? "var(--primary-green, #008751)" : "#37464f"}
            shadow={selectedOption ? "var(--primary-green-dark, #006b40)" : "#37464f"}
            hover='var(--primary-green-light, #00a566)'
            textColor={selectedOption ? "white" : "#52656d"}
            disabled={!selectedOption}
            onClick={checkAnswer}
          />
        </div>
      </div>
    </>
  );
};

export default ControlButtons;
