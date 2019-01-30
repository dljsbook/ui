import * as React from 'react';
import { css } from 'emotion';

interface IProps {
}

const containerClass = css`
width: 300px;
height: 300px;
background: black;
border-radius: 5px;
`;

const Picker:React.SFC<IProps> = ({
}) => {
  return (
    <div className={containerClass}>Picker</div>
  );
};

export default Picker;
