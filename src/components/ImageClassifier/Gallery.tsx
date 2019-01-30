import * as React from 'react';
import { css } from 'emotion';

const containerClass = css`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  // justify-content: space-between;

  img {
    width: 60px;
    height: 60px;
    margin: 5px 5px 0 0;
    object-fit: cover;
  }
`;

const placeholderClass = css`
display: flex;
height: calc(100% - 20px);
color: rgba(0,0,0,0.5);
text-align: center;
font-size: 16px;
justify-content: center;
align-items: flex-start;
padding-top: 20px;
`;

interface IProps {
  images?: string[];
}

const Gallery:React.SFC<IProps> = ({
  images,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className={containerClass}>
        <div className={placeholderClass}>Click and hold capture to record some images</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {images.map((src, key) => (
        <img key={key} src={src} />
      ))}
    </div>
  );
};

export default Gallery;
