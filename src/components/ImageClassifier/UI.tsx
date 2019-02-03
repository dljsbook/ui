import * as React from 'react';
import { css } from 'emotion';
// import Needle from './Needle';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const containerClass = css`
  display: flex;
  padding: 20px;
  flex: 1;
`;

const UI:React.SFC<IProps> = ({
  children,
}) => {
  return (
    <div className={containerClass}>
      {children}
    </div>
  );
};

export default UI;
