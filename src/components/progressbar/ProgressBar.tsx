import { useQuiz } from "../../context/QuizContext";
import "./progressbar.css";

interface ProgressBarProps {
  sectionContent: { id: number; question: string; correctAnswer: string }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ sectionContent }) => {
  const { state } = useQuiz();

  // Filter the questions answered in this specific section
  const answeredCount = sectionContent.filter(
    (_, index) => state.answeredQuestions[index]
  ).length;

  // Calculate progress based on the number of questions in the sectionContent
  const progressPercentage = (answeredCount / sectionContent.length) * 100;

  return (
    <div className='progressBar'>
      <div
        className='progressBarInner'
        // style={{ width: `${progressPercentage}%` }}
        style={{ width: `0` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
