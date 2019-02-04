import * as React from 'react';
import { css } from 'emotion';
import UI from './UI';
import Category from './Category';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUpload,
} from '@fortawesome/free-solid-svg-icons'

interface IProps {
  handleClick: (category: string) => void;
  handleMouseDown: (category: string) => void;
  onDrop: (category: string, files: File[]) => void;
  images: {
    [index: string]: string[];
  };
}

const containerClass = css`
  width: 1px;
  height: 100%;
  background: rgba(0,0,0,0.2);
`;

const dropzoneClass = css`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  transition-duration: 0.4s;
  border: 2px dashed rgba(0,0,0,0.2);
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: column;
  cursor: pointer;

  p {
    text-align: center;
    opacity: 0.5;
  }
`;

const imagesPresentClass = css`
  transition-duration: 0.2s;
  opacity: 0.0;
  justify-content: flex-end;

  &:hover {
    opacity: 1;
  }
`;

const activeClass = css`
  background: rgba(0,0,0,0.2);
`;

const sectionClass = css`
  outline-width: 0;

  display: flex;
  flex: 1;
  padding: 0 20px;
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &:focus {
    outline: none;
  }
`;

const centerClass = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

interface IPlaceholderProps {
  imagesArePresent: boolean;
  inputProps: any;
  categoryIndex: number;
  isDragActive: boolean;
}

const Placeholder: React.SFC<IPlaceholderProps> = ({
  imagesArePresent,
  categoryIndex,
  inputProps,
  isDragActive,
}) => (
  <div
    className={`
    ${dropzoneClass}
    ${isDragActive ? activeClass : ''}
    ${imagesArePresent ? imagesPresentClass : ''}
    `}
  >
    <input {...inputProps} />
    {imagesArePresent ? (
      <p>Drag and drop some images here, or click to select images to upload.</p>
    ) : (
      <p>Drag more images here</p>
    )}
  </div>
);

const Picker:React.SFC<IProps> = ({
  onDrop,
  handleClick,
  handleMouseDown,
  images,
}) => (
  <UI>
    <WrappedCategory
      title="One"
      category="one"
      handleClick={handleClick}
      handleMouseDown={handleMouseDown}
      images={images}
      onDrop={onDrop}
    />
    <div className={centerClass}>
      <div className={containerClass} />
    </div>
    <WrappedCategory
      title="Two"
      category="two"
      handleClick={handleClick}
      handleMouseDown={handleMouseDown}
      images={images}
      onDrop={onDrop}
    />
  </UI>
);

interface IWrappedCategoryProps {
  title: string;
  category: string;
  handleClick: (category: string) => void;
  handleMouseDown: (category: string) => void;
  images: {
    [index: string]: string[];
  };
  onDrop: (category: string, files: File[]) => void;
}

const WrappedCategory: React.SFC<IWrappedCategoryProps> = ({
  title,
  category,
  handleClick,
  handleMouseDown,
  images,
  onDrop,
}) => {
  const categoryIndex = title === 'One' ? 0 : 1;
  const i = images[category];
  const imagesArePresent = i !== undefined && i.length > 0;
  return (
    <Dropzone onDrop={files => onDrop(category, files)}>
      {({getRootProps, getInputProps, isDragActive}) => (
        <div {...getRootProps()} className={sectionClass}>
          <Category
            title={title}
            handleClick={() => handleClick(category)}
            handleMouseDown={() => handleMouseDown(category)}
            images={i}
            divider={imagesArePresent}
            index={categoryIndex}
            buttonText={(
              <React.Fragment>
                <FontAwesomeIcon icon={faUpload} />
                Upload
              </React.Fragment>
            )}
          >
            <Placeholder
              imagesArePresent={i !== undefined && i.length > 0}
              isDragActive={isDragActive}
              inputProps={getInputProps()}
              categoryIndex={categoryIndex}
            />
          </Category>
        </div>
      )}
    </Dropzone>
  );
};

  export default Picker;
