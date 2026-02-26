import "./ProgressBar.css";

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
}) => {
  const progressPercentage = max > 0 ? (value / max) * 100 : 0;

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
