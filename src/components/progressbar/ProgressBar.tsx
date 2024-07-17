import { useQuiz } from "../../context/QuizContext";
import "./progressbar.css";

const ProgressBar: React.FC = () => {
  const { state } = useQuiz();
  const totalQuestions = 5; // Assume total number of questions for this example

  const progressPercentage = (state.totalQuestions / totalQuestions) * 100;

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
