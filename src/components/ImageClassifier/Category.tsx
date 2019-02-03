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
    span {
      text-align: right;
    }
  }
}
`;

const dividerClass = css`
  border-bottom: 1px solid #CCC;
`;

const headerClass = css`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;

  > * {
    margin: 0;
  }

  h2 {
    padding-top: 0;
    margin: 0;
    display: flex;
    flex: 1;

    small {
      font-weight: normal;
      margin: 3px 5px 0 5px;
      opacity: 0.6;
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column !important;
    h2 {
      margin-bottom: 5px;

      span {
        flex: 1;
        text-align: left;
      }


    }
  }

  @media (max-width: 1000px) {
    h2 {
      flex-direction: column !important;
      text-align: center;
      span {
        text-align: center !important;
      }

      small {
        min-height: 17px;
        font-size: 14px;
      }
    }
  }
`;

const orangeHeader = css`
  text-align: right;
  flex-direction: row-reverse;

  h2 {
    flex-direction: row-reverse;
  }
`;

interface IProps {
  title: string;
  handleClick?: () => void;
  handleMouseDown?: () => void;
  images?: string[];
  buttonText?: string | JSX.Element;
  divider: boolean;
  children?: boolean | JSX.Element | JSX.Element[];
}

const Category:React.SFC<IProps> = ({
  title,
  handleClick,
  handleMouseDown,
  images,
  buttonText,
  divider,
  children,
}) => {
  const index = title === 'One' ? 0 : 1;
  return (
    <div className={containerClass}>
      <div className={`${headerClass} ${divider ? dividerClass : ''} ${index === 1 ? orangeHeader : ''}`}>
        <h2
          style={{
            color: `${lighten(colors.categories[index].join(','), 0)}`,
          }}
          onClick={e => {
            e.preventDefault();
          }}
        >
          <span>Category {title}</span>
          {getSubtitle(images)}
        </h2>
        {buttonText && (
          <Button
            index={index}
            handleClick={handleClick}
            handleMouseDown={handleMouseDown}
          >
            {buttonText}
          </Button>
        )}
      </div>
      <Gallery
        category={`${index}`}
        images={images}
        children={children}
      />
    </div>
  );
};

const getSubtitle = (images?: string[]) => {
  if (!images || !images.length) {
    return (<small />);
  }

  return (
    <small>
      ({images.length} {images.length === 1 ? 'image' : 'images'})
    </small>
  );
}

export default Category;
