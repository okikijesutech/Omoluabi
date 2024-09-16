import { useQuiz } from "../../context/QuizContext";
import "./progressbar.css";

interface ProgressBarProps {
  totalQuestions: number;
  sectionContent: { level: number; id: number }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ sectionContent }) => {
  const { state } = useQuiz();

  const answeredCount = sectionContent.filter(
    (_, index) => state.answeredQuestions[index]
  ).length;

  const progressPercentage = (answeredCount / sectionContent.length) * 100;

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
