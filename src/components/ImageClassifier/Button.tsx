import * as React from 'react';
import { css } from 'emotion';
import { colors, lighten } from './variables';

interface IProps {
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: JSX.Element | string | (JSX.Element | string | boolean | null)[];
  index?: number;
}

const cssButtonClass = css`
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  text-align: center;

  span, svg {
    margin-right: 10px;
  }
`;

const blue = colors.categories[0].join(',');
const blueButtonClass = css`
  background: linear-gradient(${lighten(blue, 15)}, ${lighten(blue, 0)});
  &:hover {
    background: linear-gradient(${lighten(blue, 10)}, ${lighten(blue, -5)});
  }

  &:active {
    background: linear-gradient(${lighten(blue, 10)}, ${lighten(blue, -10)});
  }
`;

const orange = colors.categories[1].join(',');
const orangeButtonClass = css`
  background: linear-gradient(${lighten(orange, 15)}, ${lighten(orange, 0)});
  &:hover {
    background: linear-gradient(${lighten(orange, 10)}, ${lighten(orange, -5)});
  }

  &:active {
    background: linear-gradient(${lighten(orange, 10)}, ${lighten(orange, -10)});
  }
`;

const Button:React.SFC<IProps> = ({
  children,
  handleClick,
  handleMouseDown,
  index,
}) => (
  <div
    className={`${cssButtonClass} ${!index ? blueButtonClass : orangeButtonClass}`}
    onClick={handleClick}
    onMouseDown={handleMouseDown}
  >
    {children}
  </div>
);

export default Button;
