import * as React from 'react';
import styled from 'react-emotion';
import { colors, lighten } from '../../styles/variables';

interface IProps {
  rotate: number;
}

const SIZE = 220;
const PADDING = 10;
const SLICES = 22;

const Hide = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: ${SIZE / 2 + PADDING}px;
  width: 100%;
  position: absolute;
  bottom: 0;
  // border-bottom: 2px solid #CCC;
  left: calc(50% - ${SIZE / 2}px);
  left: calc(50% - 150px);
  margin-bottom: -20px;
`;

const Circle = styled.div`
  position: absolute;
  border: 2px solid #CCC;
  ${({ size }) => `
    left: calc(50% - ${size / 2}px);
    top: calc(100% - ${size / 2}px);
    height: ${size}px;
    width: ${size}px;
    border-radius: ${size}px;
  `}
  background: white;
  overflow: hidden;
  transform: rotate(-82deg);
`;

const SECTION_WIDTH = 23;
const Section = styled.div`
${({ size, index, color }) => `
  width: 0;
  height: 0;
  border-top: ${SECTION_WIDTH}px solid transparent;
  border-bottom: ${SECTION_WIDTH}px solid transparent;
  border-left: ${size}px solid ${color};
  transform-origin: ${size}px ${SECTION_WIDTH}px;
  transform: rotate(${index * 360 / SLICES}deg);
  position: absolute;
  left: calc(50% - ${size}px);
  top: ${SIZE / 2 - SECTION_WIDTH}px;
  // z-index: 2;
  `}
`;

const MARKER_PADDING = 5;
const Marker = styled.div`
  ${({ size }) => `width: ${size / 2 - MARKER_PADDING}px`};
  height: 14px;
  position: absolute;
  font-size: 12px;
  display: flex;
  align-items: center;
  right: 0;
  transform-origin: 0% 50%;
  justify-content: flex-start;
  ${({ marker }) => marker === '' ?`
    display: none;
    ` : ``}

  ${({ index, size }) => index < SLICES / 2 ? `
    color: ${lighten(colors.categories[0].join(','), -20)};
    margin-top: 29px;
    transform: scale(1,1) rotate(-20deg);
    &:before {
      content: "—"
    }
    &:after {
      content: "%"
    }
  ` : `
    right: -${size / 2 - MARKER_PADDING}px;
    justify-content: flex-end;
    color: ${lighten(colors.categories[1].join(','), -15)};
    margin-top: -10px;
    transform: scale(-1,-1) rotate(-5deg);
    &:after {
      content: "%—"
    }
  `}
`;

const POINTER_SIZE = 6;
const POINTER_COLOR = '#444';
const Pointer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin-left: -4px;
  border-top: ${POINTER_SIZE}px solid transparent;
  border-bottom: ${POINTER_SIZE}px solid transparent;
  border-left: 130px solid ${POINTER_COLOR};
  transform-origin: ${POINTER_SIZE / 2}px 50%;
  transition-duration: 0.1s;
  ${({ rotate }) => `
    transform: rotate(${rotate - 90}deg);
  `}
`;

const PointerDot = styled.div`
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
  <Container>
    <Hide>
      <Circle size={SIZE}>
        {Array(SLICES).fill('').map((_, i) => {
        const index = i;
        const mid = SLICES / 2;
        console.log(index, mid);
        return (
        <Section size={SIZE / 2 + 10} index={index} color={getColor(index, mid)}>
          <Marker index={index} marker={getMarker(index)} size={SIZE}>
            {getMarker(index)}
          </Marker>
        </Section>
        );
        })}
      </Circle>
      <Circle size={50} />
    </Hide>
    <Pointer rotate={rotate} />
    <PointerDot />
  </Container>
);

export default Needle;
