import { useMemo } from 'react';
import { PATH_GEOMETRY } from '../constants/levelConstants';

interface PathPoint {
  x: number;
  y: number;
}

export const usePathCalculation = (
  contentCount: number,
  marginValues: number[]
) => {
  const points = useMemo<PathPoint[]>(() => {
    return Array.from({ length: contentCount }).map((_, index) => {
      const ml = marginValues[index % marginValues.length];
      return {
        x: ml + PATH_GEOMETRY.CENTER_OFFSET,
        y: PATH_GEOMETRY.CENTER_OFFSET + (index * PATH_GEOMETRY.VERTICAL_OFFSET),
      };
    });
  }, [contentCount, marginValues]);

  return { points };
};
