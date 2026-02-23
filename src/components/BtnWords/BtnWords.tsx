import "./btnwords.css";

interface BtnWordsProps {
  option: string;
}

const BtnWords: React.FC<BtnWordsProps> = ({ option }) => {
  return (
    <button className='btnContainer'>
      <p className='p'>{option}</p>
    </button>
  );
};

export default BtnWords;
