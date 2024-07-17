import "./btnoptions.css";

interface BtnOptionsProps {
  img?: string;
  answer: string;
  number: string;
}

const BtnOptions: React.FC<BtnOptionsProps> = ({ img, answer, number }) => {
  return (
    <div className='btnoptionsconatiner'>
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
