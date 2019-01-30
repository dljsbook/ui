import * as React from 'react';
import { css } from 'emotion';
import { colors, lighten } from './variables';

interface IProps {
  rotate: number;
}

const SIZE = 220;
const PADDING = 10;
const SLICES = 22;

const hideClass = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const containerClass = css`
  height: ${SIZE / 2 + PADDING}px;
  width: 100%;
  position: absolute;
  bottom: 0;
  // border-bottom: 2px solid #CCC;
  left: calc(50% - ${SIZE / 2}px);
  left: calc(50% - 150px);
  margin-bottom: -20px;
`;

const circleClass = css`
  position: absolute;
  border: 2px solid #CCC;
  background: white;
  overflow: hidden;
  transform: rotate(-82deg);
`;

const SECTION_WIDTH = 23;
const sectionClass = css`
  width: 0;
  height: 0;
  position: absolute;
  top: ${SIZE / 2 - SECTION_WIDTH}px;
  border-top: ${SECTION_WIDTH}px solid transparent;
  border-bottom: ${SECTION_WIDTH}px solid transparent;
`;

const MARKER_PADDING = 5;
const markerClass = css`
  height: 14px;
  position: absolute;
  font-size: 12px;
  display: flex;
  align-items: center;
  right: 0;
  transform-origin: 0% 50%;
  justify-content: flex-start;
`;

const firstIndex = css`
  color: ${lighten(colors.categories[0].join(','), -20)};
  margin-top: 29px;
  transform: scale(1,1) rotate(-20deg);
  &:before {
    content: "—"
  }
  &:after {
    content: "%"
  }
`;

const secondIndex = css`
    right: -${SIZE / 2 - MARKER_PADDING}px;
    justify-content: flex-end;
    color: ${lighten(colors.categories[1].join(','), -15)};
    margin-top: -10px;
    transform: scale(-1,-1) rotate(-5deg);
    &:after {
      content: "%—"
    }
`;

const POINTER_SIZE = 6;
const POINTER_COLOR = '#444';
const pointerClass = css`
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -4px;
  border-top: ${POINTER_SIZE}px solid transparent;
  border-bottom: ${POINTER_SIZE}px solid transparent;
  border-left: 130px solid ${POINTER_COLOR};
  transform-origin: ${POINTER_SIZE / 2}px 50%;
  transition-duration: 0.1s;
`;

const pointerDotClass = css`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  margin-bottom: -10px;
  border-radius: 24px;
  background: ${POINTER_COLOR};
  border: 1px solid white;
`;

const getColor = (index: number, mid: number) => {

  let color_index = SLICES - index;
  let color = 1;

  if (index < mid) {
    color_index = index;
    color = 0;
  }

  const amount = 4.5 * color_index;

  return lighten(colors.categories[color].join(','), amount);
};

const getMarker = (index: number) => {
  const marker = Math.abs((SLICES / 2 ) - index) / (SLICES / 2 - 1) * 200;

  if (marker < 100 && marker > 0) {
    return parseInt(`${marker}`, 10);
  }

  return '';
}

const Needle:React.SFC<IProps> = ({
  rotate,
}) => (
  <div className={containerClass}>
    <div className={hideClass}>
      <div
        className={circleClass}
        style={{
          left: `calc(50% - ${SIZE/2}px)`,
          top: `calc(100% - ${SIZE/2}px)`,
          height: `${SIZE}px`,
          width: `${SIZE}px`,
          borderRadius: `${SIZE}px`,
        }}
      >
        {Array(SLICES).fill('').map((_, i) => {
        const index = i;
        const mid = SLICES / 2;
        console.log(index, mid);
        return (
        <div
          className={sectionClass}
          style={{
            borderLeft: `${SIZE / 2 + 10}px solid ${getColor(index, mid)}`,
            transformOrigin: `${SIZE / 2 + 10}px ${SECTION_WIDTH}px`,
            transform: `rotate(${index * 360 / SLICES}deg)`,
            left: `calc(50% - ${SIZE / 2 + 10}px)`,
          }}
        >
          <div
            className={`${markerClass} ${index < SLICES / 2 ? firstIndex : secondIndex}`}

            style={{
              width: `${SIZE / 2 - MARKER_PADDING}px`,
              display: getMarker(index) === '' ? 'none' : '',
            }}
          >
            {getMarker(index)}
          </div>
        </div>
        );
        })}
      </div>
      <div
        className={circleClass}
        style={{
          left: `calc(50% - ${50/2}px)`,
          top: `calc(100% - ${50/2}px)`,
          height: `50px`,
          width: `50px`,
          borderRadius: `50px`,
        }}
      />
    </div>
    <div
      className={pointerClass}
      style={{
        transform: `rotate(${rotate - 90}deg)`,
      }}
    />
    <div className={pointerDotClass} />
  </div>
);

export default Needle;
