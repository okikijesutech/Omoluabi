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
  disabled?: boolean;
  onClick?: () => void;
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
  disabled = false,
  onClick,
}) => {
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      event.currentTarget.style.backgroundColor = hover;
      if (hoverbordercolor) {
        event.currentTarget.style.borderColor = hoverbordercolor;
      }
    }
  };
  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      event.currentTarget.style.backgroundColor = bgcolor;
      event.currentTarget.style.borderColor = bordercolor;
    }
  };
  return (
    <Link to={to}>
      <div
        className={`btn ${disabled ? "disabled" : ""}`}
        style={{
          backgroundColor: `${bgcolor}`,
          color: `${textColor}`,
          boxShadow: `0 8px 0 ${shadow}`,
          border: `2px solid ${bordercolor}`,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={onClick}
      >
        {title}
      </div>
    </Link>
  );
};

export default BtnPrimary;
