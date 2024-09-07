import { useQuiz } from "../../context/QuizContext";
import "./progressbar.css";

interface ProgressBarProps {
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalQuestions }) => {
  const { state } = useQuiz();

  console.log("Answered Questions:", state.answeredQuestions);

  const answeredCount = state.answeredQuestions.filter(
    (answered) => answered
  ).length;

  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className='progressBar'>
      <div
        className='progressBarInner'
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
