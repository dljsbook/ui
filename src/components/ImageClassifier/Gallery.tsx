import * as React from 'react';
import { css } from 'emotion';

const containerClass = css`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  overflow: scroll;
  height: 240px;

  img {
    width: 50px;
    height: 50px;
    margin: 5px 5px 0 0;
    object-fit: cover;
  }
`;

interface IProps {
  images?: string[];
  category: string;
  children?: boolean | JSX.Element | JSX.Element[];
}

const Gallery:React.SFC<IProps> = ({
  images,
  category,
  children,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className={containerClass}>
        {children}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {children}
      {images.map((src, key) => (
        <img key={key} src={src} />
      ))}
    </div>
  );
};

export default Gallery;
