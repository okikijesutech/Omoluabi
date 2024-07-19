import { Outlet, Link, useLocation } from "react-router-dom";
import "./literacylayout.css";

const LiteracyLayout = () => {
  const location = useLocation();

  return (
    <div className='literacycontainer'>
      <div className='navbutton'>
        <Link to={"/learnlanguage/literacy/alphabets"}>
          <div
            className={
              location.pathname === "/learnlanguage/literacy/alphabets"
                ? "active"
                : ""
            }
          >
            <p>Alphabet</p>
          </div>
        </Link>
        <Link to={"/learnlanguage/literacy/numbers"}>
          <div
            className={
              location.pathname === "/learnlanguage/literacy/numbers"
                ? "active"
                : ""
            }
          >
            <p>Number</p>
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default LiteracyLayout;
