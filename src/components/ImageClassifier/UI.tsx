import * as React from 'react';
import { css } from 'emotion';
import Category from './Category';
// import Needle from './Needle';

interface IProps {
  children: JSX.Element;
  rotate: number;
  handleClick: (category: string) => void;
  handleMouseDown: (category: string) => void;
  images: {
    [index: string]: string[];
  };
}

const containerClass = css`
  display: flex;
  padding: 20px;
  flex: 1;
`;

const centerClass = css`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
position: relative;
`;

const UI:React.SFC<IProps> = ({
  children,
  rotate,
  handleClick,
  handleMouseDown,
  images,
}) => (
  <div className={containerClass}>
    <Category
      title="One"
      handleClick={() => handleClick('one')}
      handleMouseDown={() => handleMouseDown('one')}
      images={images['one']}
    />
    <div className={centerClass}>
      {children}
      { /* <Needle rotate={rotate} /> */ }
    </div>
    <Category
      title="Two"
      handleClick={() => handleClick('two')}
      handleMouseDown={() => handleMouseDown('two')}
      images={images['two']}
    />
  </div>
);

export default UI;
