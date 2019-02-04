import * as React from 'react';
import { css } from 'emotion';
import { colors, lighten } from './variables';

interface IProps {
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: JSX.Element | string | (JSX.Element | string | boolean | null)[];
  index?: number;
  disabled?: boolean;
  action?: boolean;
}

const cssButtonClass = css`
  color: white;
  -webkit-user-select: none;
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

const makeButtonClass = (hsl: number[]) => {
  const color = hsl.join(',');
return `
  background: linear-gradient(${lighten(color, 20)}, ${lighten(color, 0)});
  &:hover {
    background: linear-gradient(${lighten(color, 15)}, ${lighten(color, -5)});
  }

  &:active {
    background: linear-gradient(${lighten(color, 10)}, ${lighten(color, -15)});
  }
`;
}

const blueButtonClass = css`${makeButtonClass(colors.categories[0])} `;

const orangeButtonClass = css`${makeButtonClass(colors.categories[1])}`;

const gray = colors.gray.join(',');
const disabledClass = css`
  cursor: default;
  background: linear-gradient(${lighten(gray, 20)}, ${lighten(gray, 0)});
  &:hover, &:active {
    background: linear-gradient(${lighten(gray, 20)}, ${lighten(gray, 0)});
  }
`;

const actionClass = css`
  ${makeButtonClass(colors.action)}
`;

const getButtonClass = (disabled?: boolean, action?: boolean, index?: number) => {
  if (disabled) {
    return disabledClass;
  }

  if (action) {
    return actionClass;
  }

  return!index ? blueButtonClass : orangeButtonClass;
}

const Button:React.SFC<IProps> = ({
  children,
  handleClick,
  handleMouseDown,
  index,
  disabled,
  action,
}) => (
  <div
    className={`
    ${cssButtonClass}
    ${getButtonClass(disabled, action, index)}
    `}
    onClick={!disabled ? handleClick : undefined}
    onMouseDown={!disabled ? handleMouseDown : undefined}
  >
    {children}
  </div>
);

export default Button;
