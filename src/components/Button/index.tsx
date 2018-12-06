import * as React from 'react';
import styled from 'styled-components';
import lighten from '../../utils/lighten';
import { colors, fonts } from '../../config';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel)

type ChildrenTypes = string|JSX.Element|undefined|number;
type Children = ChildrenTypes|ChildrenTypes[];

interface IProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: Children;
  color?: number;
}

interface IStyledButtonProps {
  color: string;
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${props => `background: linear-gradient(${lighten(props.color, 15)}, ${lighten(props.color, 0)});`}
  font-family: ${fonts.sansSerif};
  font-size: 16px;

  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;

  span, svg {
    margin-right: 10px;
  }

  &:hover {
    ${props => `background: linear-gradient(${lighten(props.color, 10)}, ${lighten(props.color, -5)});`}
  }

  &:active {
    background: linear-gradient(hsl(210,100%,73%), hsl(210,100%,58%));
    ${props => `background: linear-gradient(${lighten(props.color, 10)}, ${lighten(props.color, -10)});`}
  }
`;

const Button:React.SFC<IProps> = ({
  children,
  handleClick,
  color,
}) => (
  <StyledButton
    onClick={handleClick}
    color={colors.categories[color || 0].join(',')}
  >
    <FontAwesomeIcon icon="stroopwafel" />
    {children}
  </StyledButton>
);

Button.defaultProps = {
  color: 0,
};

export default Button;

