import React, { useMemo } from 'react';
import './PathLine.css';

interface PathLineProps {
  points: { x: number; y: number }[];
  color?: string;
}

const PathLine: React.FC<PathLineProps> = ({ points, color }) => {
  const pathData = useMemo(() => {
    if (points.length < 2) return "";

    return points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      
      const prev = points[i - 1];
      // Midpoint-based control points for smooth organic curves
      const cp1y = prev.y + (point.y - prev.y) / 2;
      const cp2y = prev.y + (point.y - prev.y) / 2;

      return `${acc} C ${prev.x} ${cp1y}, ${point.x} ${cp2y}, ${point.x} ${point.y}`;
    }, "");
  }, [points]);

  if (points.length < 2) return null;

  return (
    <svg 
      className='path-line' 
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        pointerEvents: "none" 
      }}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d={pathData}
        fill='none'
        stroke={color || '#e5e5e5'}
        strokeWidth='14'
        strokeLinecap='round'
        strokeLinejoin='round'
        filter="url(#glow)"
        style={{ opacity: 0.8 }}
      />
    </svg>
  );
};

export default PathLine;
