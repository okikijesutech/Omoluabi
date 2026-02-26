import { Link } from "react-router-dom";
import "./BtnPrimary.css";

interface BtnPrimaryProps {
  title: string;
  textColor: string;
  bgcolor: string;
  shadow: string;
  hover: string;
  bordercolor: string;
  to?: string;
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
  const buttonContent = (
    <div
      className={`btn ${disabled ? "disabled" : ""}`}
      style={{
        backgroundColor: bgcolor,
        color: textColor,
        boxShadow: `0 8px 0 ${shadow}`,
        border: `2px solid ${bordercolor}`,
        // @ts-ignore
        "--hover-bg": hover,
        "--hover-border": hoverbordercolor || bordercolor,
      } as React.CSSProperties}
      onClick={!disabled ? onClick : undefined}
    >
      {title}
    </div>
  );

  return to && !disabled ? <Link to={to}>{buttonContent}</Link> : buttonContent;
};

export default BtnPrimary;
