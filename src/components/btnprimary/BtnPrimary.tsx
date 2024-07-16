import { Link } from "react-router-dom";
import "./btnprimary.css";

interface BtnPrimaryProps {
  title: string;
  textColor: string;
  bgcolor: string;
  shadow: string;
  hover: string;
  bordercolor: string;
  to: string;
  hoverbordercolor?: string;
}

const BtnPrimary: React.FC<BtnPrimaryProps> = ({
  title,
  textColor,
  bgcolor,
  shadow,
  hover,
  bordercolor,
  to,
  hoverbordercolor,
}) => {
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = hover;
    if (hoverbordercolor) {
      event.currentTarget.style.borderColor = hoverbordercolor;
    }
  };
  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = bgcolor;
    event.currentTarget.style.borderColor = bordercolor;
  };
  return (
    <Link to={to}>
      <div
        className='btn'
        style={{
          backgroundColor: `${bgcolor}`,
          color: `${textColor}`,
          boxShadow: `0 8px 0 ${shadow}`,
          border: `2px solid ${bordercolor}`,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {title}
      </div>
    </Link>
  );
};

export default BtnPrimary;
