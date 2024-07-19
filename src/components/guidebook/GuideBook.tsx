import { FaChevronLeft } from "react-icons/fa6";
import BtnPrimary from "../btnprimary/BtnPrimary";
import "./guidebook.css";

interface GuideBookProps {
  section: string;
  unit: string;
  unitname: string;
  unitcolor: string;
  unitshadow: string;
}

const GuideBook: React.FC<GuideBookProps> = ({
  section,
  unit,
  unitname,
  unitcolor,
  unitshadow,
}) => {
  return (
    <div
      className='guidebookcontainer'
      style={{ backgroundColor: `${unitcolor}` }}
    >
      <div className='guidebook-content'>
        <p className='guidebookheading'>
          <FaChevronLeft size={24} />
          section {section}, unit {unit}
        </p>
        <p className='guidebook-unitname'>{unitname}</p>
      </div>
      <BtnPrimary
        title='GUIDE BOOK'
        bgcolor={unitcolor}
        bordercolor={unitcolor}
        shadow={unitshadow}
        hover='#7fb42a'
        to=''
        textColor='white'
      />
    </div>
  );
};

export default GuideBook;
