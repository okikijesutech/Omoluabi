import React from 'react';
import { GiBookCover } from "react-icons/gi";
import './DynamicUnitHeader.css';

interface DynamicUnitHeaderProps {
  title: string;
  subtitle: string;
  themeColor: string;
  shadowColor: string;
}

const DynamicUnitHeader: React.FC<DynamicUnitHeaderProps> = ({ 
  title, 
  subtitle, 
  themeColor, 
  shadowColor 
}) => {
  return (
    <div 
      className="dynamic-unit-header" 
      style={{ 
        backgroundColor: themeColor,
        boxShadow: `0 8px 0 ${shadowColor}`
      }}
    >
      <div className="dynamic-header-content">
        <div className="dynamic-info">
          <p className="unit-label">{title}</p>
          <h1 className="unit-name">{subtitle}</h1>
        </div>
        <button className="guidebook-action">
          <GiBookCover size={24} />
          <span>Guidebook</span>
        </button>
      </div>
    </div>
  );
};

export default DynamicUnitHeader;
