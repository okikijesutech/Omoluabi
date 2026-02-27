import "./LevelImage.css";

interface LevelImageProps {
  side?: 'left' | 'right';
}

const LevelImage: React.FC<LevelImageProps> = ({ side = 'left' }) => {
  return (
    <div className={`level-img floating-${side}`}>
      <img src="/content/yoruba/assets/images/yoruba_scholar.png" alt='Yoruba Scholar' />
    </div>
  );
};

export default LevelImage;
