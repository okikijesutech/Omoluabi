import "./btnprimary.css";

interface BtnPrimaryProps {
  title: string;
  textColor: string;
  bgcolor: string;
  shadow: string;
  hover: string;
}

const BtnPrimary: React.FC<BtnPrimaryProps> = ({
  title,
  textColor,
  bgcolor,
  shadow,
  hover,
}) => {
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = hover;
  };
  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = bgcolor;
  };
  return (
    <div
      className='btn'
      style={{
        backgroundColor: `${bgcolor}`,
        color: `${textColor}`,
        boxShadow: `0 8px 0 ${shadow}`,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {title}
    </div>
  );
};

export default BtnPrimary;
