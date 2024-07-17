import "./btnoptions.css";

interface BtnOptionsProps {
  img?: string;
  answer: string;
  number: number; // Change to number type
  isSelected: boolean;
}

const BtnOptions: React.FC<BtnOptionsProps> = ({
  img,
  answer,
  number,
  isSelected,
}) => {
  return (
    <div
      className={`btnoptionsconatiner ${isSelected ? "selected" : ""}`} // Apply selected class if isSelected
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
