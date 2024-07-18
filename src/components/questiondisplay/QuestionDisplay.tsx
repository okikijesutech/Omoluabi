import React from "react";
import BtnOptions from "../btnoptions/BtnOptions";
import { IoSparkles } from "react-icons/io5";
import img from "../../assets/images/water-bottle.png";
import "./questiondisplay.css";

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
  selectedOption,
  setSelectedOption,
}) => {
  return (
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
            onClick={() => setSelectedOption(option.number)}
          >
            <BtnOptions
              img={img}
              answer={option.answer}
              number={option.number}
              isSelected={selectedOption === option.number}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
