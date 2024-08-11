import { Link } from "react-router-dom";
import "./lessoncomplete.css";

const LessonCompletePage = () => {
  return (
    <div className='lessonCompleteContainer'>
      <h1>Congratulations!</h1>
      <p>You have successfully completed the lesson.</p>

      {/* Display lesson performance summary if needed */}
      <div className='lessonSummary'>
        <h2>Lesson Summary</h2>
        <p>Total Questions: 10</p>
        <p>Correct Answers: 8</p>
        <p>Accuracy: 80%</p>
      </div>

      {/* Options to review or continue */}
      <div className='lessonCompleteActions'>
        <Link to='/review'>Review Lesson</Link>
        <Link to='/next-lesson'>Next Lesson</Link>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default LessonCompletePage;
