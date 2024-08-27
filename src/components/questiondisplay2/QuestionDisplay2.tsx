import BtnSound2 from "../btnsound2/BtnSound2";
import BtnWords from "../btnwords/BtnWords";
import sound from "../../assets/sounds/a.mp3";
import "./questiondisplay2.css";

interface Option {
  img: string;
  answer: string;
  number: number;
}

interface QuestionDisplayProps {
  question: {
    id: number;
    question: string;
    options: Option[];
    correctAnswer: number;
  };
  selectedOption: number | null;
  setSelectedOption: (option: number | null) => void;
}

const QuestionDisplay2: React.FC<QuestionDisplayProps> = ({
  question,
  setSelectedOption,
}) => {
  return (
    <div className='questiondisplay'>
      <div>
        {/* <p>{question.question}</p> */}
        <p>Tap what you hear</p>
      </div>
      <div className='soundButtonsContainer'>
        <div className='bigBtn'>
          <BtnSound2 sound={sound} rate={1} />
        </div>
        <div className='smallBtn'>
          <BtnSound2 sound={sound} rate={0.5} />
        </div>
      </div>
      <hr className='displayHr' />
      <div className='optionsdisplay'>
        {question.options.map((option) => (
          <div
            key={option.number}
            onClick={() => setSelectedOption(option.number)}
          >
            <BtnWords />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay2;
