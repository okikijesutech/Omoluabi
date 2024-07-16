import "./levelsheading.css";

interface LevelsHeadingProps {
  name: string;
}

const LevelsHeading: React.FC<LevelsHeadingProps> = ({ name }) => {
  return (
    <div>
      <div className='levelsheading'>
        <hr />
        {name}
        <hr />
      </div>
    </div>
  );
};

export default LevelsHeading;
