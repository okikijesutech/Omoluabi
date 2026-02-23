import React, { useState, useEffect } from "react";
import { IoSparkles } from "react-icons/io5";
import BtnOptions from "../BtnOptions/BtnOptions";
import BtnWords from "../BtnWords/BtnWords";
import BtnSound2 from "../BtnSound2/BtnSound2";
import { Question, Option } from "../../types/content";
import "./QuestionDisplay.css";

interface QuestionDisplayProps {
  question: Question;
  selectedOption: string | number | null;
  setSelectedOption: (option: any) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedOption,
  setSelectedOption,
}) => {
  const [selectedWords, setSelectedWords] = useState<Option[]>([]);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedWords([]);
  }, [question.id]);

  const handleWordClick = (option: Option) => {
    if (selectedWords.find(w => w.id === option.id)) {
      setSelectedWords(selectedWords.filter(w => w.id !== option.id));
    } else {
      setSelectedWords([...selectedWords, option]);
    }
  };

  const renderHeader = () => {
    switch (question.type) {
      case "audio":
        return <p>Tap what you hear</p>;
      case "translate":
        return <p>Translate this sentence</p>;
      default:
        return (
          <h4>
            <IoSparkles size={18} />
            New Word
          </h4>
        );
    }
  };

  const renderContent = () => {
    if (question.type === "audio") {
      return (
        <div className='soundButtonsContainer'>
          <div className='bigBtn'>
            <BtnSound2 sound={question.audioUrl || ""} rate={1} />
          </div>
          <div className='smallBtn'>
            <BtnSound2 sound={question.audioUrl || ""} rate={0.5} />
          </div>
        </div>
      );
    }
    return <p className="questionText">{question.question}</p>;
  };

  const renderOptions = () => {
    const isWordMode = question.type === "translate" || question.type === "audio" || question.type === "listen";

    return (
      <div className='optionsdisplay'>
        {question.options.map((option) => {
          const isSelected = isWordMode 
            ? selectedWords.some(w => w.id === option.id)
            : selectedOption === option.id || selectedOption === option.answer;

          return (
            <div
              key={option.id}
              onClick={() => {
                if (isWordMode) {
                  handleWordClick(option);
                } else {
                  setSelectedOption(option.id);
                }
              }}
              className={`optionItem ${isSelected && isWordMode ? "hidden" : ""}`}
            >
              {isWordMode ? (
                <BtnWords option={option.answer} />
              ) : (
                <BtnOptions
                  img={option.img}
                  answer={option.answer}
                  number={option.id}
                  isSelected={isSelected}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='questiondisplay'>
      <div className="questionHeader">
        {renderHeader()}
        {renderContent()}
      </div>

      {(question.type === "translate" || question.type === "audio") && (
        <>
          <div className="selectionArea">
            {selectedWords.map(word => (
              <div key={word.id} onClick={() => handleWordClick(word)}>
                <BtnWords option={word.answer} />
              </div>
            ))}
          </div>
          <hr className='displayHr' />
        </>
      )}

      {renderOptions()}
    </div>
  );
};

export default QuestionDisplay;
