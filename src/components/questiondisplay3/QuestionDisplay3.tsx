import { useState, useEffect } from "react";
import { IoSparkles } from "react-icons/io5";
import "./questiondisplay3.css";
import BtnWords from "../btnwords/BtnWords";

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

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
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

  useEffect(() => {
    setSelected(null);
    setIsAboveHr(false);
    setSelectedOption(null);
  }, [question.id, setSelectedOption]);

  return (
    <div className='questiondisplay'>
      <div>
        <h4>
          <IoSparkles size={18} />
          New Word
        </h4>
        <p>{question.question}</p>
      </div>
      <hr className='displayHr' />
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

export default QuestionDisplay;
