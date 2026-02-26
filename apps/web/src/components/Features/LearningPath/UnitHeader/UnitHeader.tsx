import React from 'react';
import { GiBookCover } from "react-icons/gi";
import './UnitHeader.css';

interface UnitHeaderProps {
  unit: string;
  unitname: string;
  unitcolor: string;
  unitshadow: string;
}

const UnitHeader: React.FC<UnitHeaderProps> = ({ unit, unitname, unitcolor, unitshadow }) => {
  return (
    <div className="unit-header" style={{ backgroundColor: unitcolor, boxShadow: `0 8px 0 ${unitshadow}` }}>
      <div className="unit-header-content">
        <div className="unit-info">
          <h3>{unit}</h3>
          <h1>{unitname}</h1>
        </div>
        <button className="guidebook-btn">
          <GiBookCover size={24} />
          <span>GUIDEBOOK</span>
        </button>
      </div>
    </div>
  );
};

export default UnitHeader;
