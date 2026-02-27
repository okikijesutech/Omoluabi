import React from 'react';
import { Question } from "../../../../types/content";
import { QuestionDisplay } from "../../../index";
import './exercise.css';

interface ExerciseProps {
  question: Question;
  selectedOption: string | number | null;
  onSelect: (option: any) => void;
}

const Exercise: React.FC<ExerciseProps> = ({ question, selectedOption, onSelect }) => {
  return (
    <div className="exercise-container">
      <QuestionDisplay 
        question={question}
        selectedOption={selectedOption}
        setSelectedOption={onSelect}
      />
      
      <div className="exercise-footer">
        <a 
          href={`https://github.com/okikijesutech/Omoluabi/issues/new?title=Content Suggestion: ${question.question}&body=Language: Yoruba%0AQuestion: ${question.question}%0ASuggestion: `}
          target="_blank" 
          rel="noopener noreferrer"
          className="suggest-correction-link"
        >
          Suggest a correction
        </a>
      </div>
    </div>
  );
};

export default Exercise;
