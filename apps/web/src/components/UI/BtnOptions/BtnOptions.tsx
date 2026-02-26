import "./BtnOptions.css";

interface BtnOptionsProps {
  img?: string;
  answer: string;
  number: number; // Change to number type
  isSelected: boolean;
}

const BtnOptions: React.FC<BtnOptionsProps & { onClick?: () => void }> = ({
  img,
  answer,
  number,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`btnoptionscontainer ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className='optionsImg'>
        <img src={img} alt='' />
      </div>
      <div className='optionstext'>
        <p>{answer}</p>
        <p className='pbtn'>{number}</p>
      </div>
    </div>
  );
};

export default BtnOptions;
