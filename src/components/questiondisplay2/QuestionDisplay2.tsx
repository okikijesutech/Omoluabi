import { useState } from "react";
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
  const [selected, setSelected] = useState<Option | null>(null);
  const [isAboveHr, setIsAboveHr] = useState<boolean>(false);

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsAboveHr(true);
    setSelectedOption(option.number);
  };
  const handleReturnClick = () => {
    setIsAboveHr(false);
    setSelected(null);
    setSelectedOption(null);
  };

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
      {selected && isAboveHr && (
        <div className='selectedOption' onClick={handleReturnClick}>
          <BtnWords option={selected.answer} />
        </div>
      )}
      <hr className='displayHr' />
      <div className='optionsdisplay'>
        {question.options.map((option) => (
          <div
            key={option.number}
            onClick={() => handleOptionClick(option)}
            className={`optionItem ${
              selected && selected.number === option.number ? "hidden" : ""
            }`}
          >
            <BtnWords option={option.answer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay2;
