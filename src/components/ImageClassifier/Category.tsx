import * as React from 'react';
import { css } from 'emotion';
import Button from './Button';
import Gallery from './Gallery';
import { colors, lighten } from './variables';

const containerClass = css`
display: flex;
flex: 1;
flex-direction: column;
padding: 0 20px;

&:first-child {
  padding-left: 0;
}

&:last-child {
  padding-right: 0;
  h2 {
    text-align: right;
  }
}
`;

const headerClass = css`
display: flex;
flex-direction: row;
border-bottom: 1px solid #CCC;
padding-bottom: 10px;

> * {
  margin: 0;
}

h2 {
padding-top: 0;
margin: 0;
flex: 1;
}

@media (max-width: 1000px) {
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 5px;
  }

}
`;

const orangeHeader = css`
text-align: right;
flex-direction: row-reverse;

@media (max-width: 1000px) {
  flex-direction: column;
  h2 {
    text-align: center;
  }
}
`;

interface IProps {
  title: string;
  handleClick?: () => void;
  handleMouseDown?: () => void;
  images?: string[];
}

const Category:React.SFC<IProps> = ({
  title,
  handleClick,
  handleMouseDown,
  images,
}) => {
  const index = title === 'One' ? 0 : 1;
  return (
    <div className={containerClass}>
    <div className={`${headerClass} ${index === 1 ? orangeHeader : ''}`}>
      <h2
        style={{
          color: `${lighten(colors.categories[index].join(','), 0)}`,
        }}
      >Category {title}</h2>
      <Button
        index={index}
        handleClick={handleClick}
        handleMouseDown={handleMouseDown}
      >Capture</Button>
    </div>
      <Gallery images={images} />
    </div>
  );
};

export default Category;
