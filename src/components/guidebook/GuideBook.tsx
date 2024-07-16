import { FaChevronLeft } from "react-icons/fa6";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./guidebook.css";

interface GuideBookProps {
  section: string;
  unit: string;
  unitname: string;
  unitcolor: string;
}

const GuideBook: React.FC<GuideBookProps> = ({
  section,
  unit,
  unitname,
  unitcolor,
}) => {
  return (
    <div
      className='guidebookcontainer'
      style={{ backgroundColor: `${unitcolor}` }}
    >
      <div>
        <p className='guidebookheading'>
          <FaChevronLeft size={24} />
          section {section}, unit {unit}
        </p>
        <p>{unitname}</p>
      </div>
      <BtnPrimary
        title='GUIDE BOOk'
        bgcolor={unitcolor}
        bordercolor={unitcolor}
        shadow='#46a302'
        hover='#7fb42a'
        to=''
        textColor='white'
      />
    </div>
  );
};

export default GuideBook;
