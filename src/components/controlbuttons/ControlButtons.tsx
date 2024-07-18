import BtnPrimary from "../btnprimary/BtnPrimary";
import "./controlbutton.css";

interface ControlButtonsProps {
  selectedOption: number | null;
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
            bordercolor={selectedOption ? "#93d333" : "#37464f"}
            bgcolor={selectedOption ? "#93d333" : "#37464f"}
            shadow={selectedOption ? "#79b933" : "#37464f"}
            hover='#79b933'
            textColor={selectedOption ? "#131f24" : "#52656d"}
            disabled={!selectedOption}
            onClick={checkAnswer}
          />
        </div>
      </div>
    </>
  );
};

export default ControlButtons;
