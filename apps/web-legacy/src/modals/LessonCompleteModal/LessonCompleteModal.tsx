interface LessonCompleteProps {
  total: number;
  correct: number;
}

const LessonCompletePage: React.FC<LessonCompleteProps> = ({ total, correct }) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className='lesson-complete-overlay'>
      <div className='lesson-complete-card'>
        <div className='celebration-icon'>🎉</div>
        <h1>Lesson Complete!</h1>
        <p>You're becoming an Ọmọlúàbí scholar!</p>
        
        <div className='stats-grid'>
          <div className='stat-card'>
            <span className='stat-value'>{total}</span>
            <span className='stat-label'>Total Items</span>
          </div>
          <div className='stat-card'>
            <span className='stat-value'>{correct}</span>
            <span className='stat-label'>Correct</span>
          </div>
          <div className='stat-card'>
            <span className='stat-value'>{accuracy}%</span>
            <span className='stat-label'>Accuracy</span>
          </div>
        </div>

        <div className='lessonCompleteActions'>
          <Link to='/learnlanguage' className='btn-primary'>Continue</Link>
          <Link to='/learnlanguage/literacy' className='btn-secondary'>Review Skills</Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCompletePage;
