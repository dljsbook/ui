import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'emotion';
import Button from './Button';
import Picker from './Picker';
import Video from './Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUndo,
  faChevronLeft,
  faCameraRetro,
  faImages,
} from '@fortawesome/free-solid-svg-icons'

interface IImages {
  [index: string]: string[];
};

interface IProps {
  attachGetImages: (callback: () => IImages) => void;
  handleImages: (images: IImages) => void;
}

interface IState {
  rotate: number;
  input: string | null;
  capturing: string | null;
  images: {
    webcam: IImages;
    upload: IImages;
  };
}

const processDroppedImage = (file: File): Promise<string> => new Promise((resolve, reject) => {
  var reader = new FileReader();

  reader.onload = (e: any) => {
    if (e.target) {
      return resolve(e.target.result);
    }

    reject('Could not find result');
  };

  // read the image file as a data URL.
  reader.readAsDataURL(file);
});

const processDroppedImages = (files: File[]): Promise<string[]> => new Promise((resolve, reject) => {
  Promise.all(files.map(file => processDroppedImage(file))).then(files => {
    resolve(files);
  });
});

class ImageClassifierComponent extends React.Component<IProps, IState> {
  state: IState = {
    input: null,
    rotate: 0,
    capturing: null,
    images: {
      webcam: {},
      upload: {},
    },
  };

  constructor(props: IProps) {
    super(props);

    props.attachGetImages(this.getImages.bind(this));
  }

  getImages = (): IImages => {
    if (!this.state.input) {
      throw new Error('No input mode active');
    }

    return this.state.images[this.state.input];
  }

  handleImages = (e: React.MouseEvent) => {
    this.props.handleImages(this.getImages());
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
    // setInterval(() => {
    //   this.setState({
    //     rotate: parseInt(`${Math.random() * 180 - 90}`, 10),
    //   });
    // }, 200);
  }

  componentWillUnmount = () => {
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  back = () => this.setState({
    input: null,
  });

  reset = () => {
    if (this.state.input) {
      this.setState({
        images: {
          ...this.state.images,
          [this.state.input]: {},
        },
      });
    }
  }

  setInput = (input: string) => this.setState({
    input,
  })

  handleClick = (category: string) => {
  }

  handleMouseDown = (category: string) => {
    this.setState({
      capturing: category,
    });
  }

  handleMouseUp = () => {
    this.setState({
      capturing: null,
    });
  }

  capture = (pixels: string) => {
    if (!this.state.capturing) {
      throw new Error('Capture called without an active category');
    }
    if (!this.state.input) {
      throw new Error('No input set');
    }

    this.updateImages('webcam', this.state.capturing, [pixels]);
  }

  updateImages = (mode: string, category: string, images: string[]) => {
    const payload = {
      images: {
        ...this.state.images,
        [mode]: {
        ...this.state.images[mode],
          [category]: [
            ...(this.state.images[mode][category] || []),
            ...images,
          ],
        }
      },
    };

    this.setState({
      ...this.state,
      ...payload,
    });
  }

  onDrop = async (category: string, files: File[]) => {
    const processedImages = await processDroppedImages(files);
    this.updateImages('upload', category, processedImages);
  }

  render() {
    if (this.state.input === null) {
      return (
        <div className={containerClass}>
          <div className={headerClass} />
          <div className={chooserClass}>
            <p>Choose your input source</p>
            <Button
              handleClick={() => this.setInput('webcam')}
            >
              <FontAwesomeIcon icon={faCameraRetro} />
              Webcam
            </Button>
            <div className={orClass} />
            <Button
              handleClick={() => this.setInput('upload')}
            >
              <FontAwesomeIcon icon={faImages} />
              Upload
            </Button>
          </div>
        </div>
      );
    }

    const images = this.state.images[this.state.input];

    const disabled = Object.values(images).reduce((present: number, category: string[]) => {
      return present + (category.length > 0 ? 1 : 0);
    }, 0) < 2;

    return (
      <div className={containerClass}>
        <div className={headerClass}>
          <div className={leftClass}>
            <a onClick={this.back}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Back
            </a>
          </div>
          <div className={rightClass}>
            <a onClick={this.reset}>
              <FontAwesomeIcon icon={faUndo} />
              Reset
            </a>
          </div>
        </div>
        {this.state.input === 'webcam' ? (
          <Video
            capture={this.state.capturing ? this.capture : undefined}
            handleClick={this.handleClick}
            handleMouseDown={this.handleMouseDown}
            images={images}
          />
        ) : (
          <Picker
            onDrop={this.onDrop}
            handleClick={this.handleClick}
            handleMouseDown={this.handleMouseDown}
            images={images}
          />
        )}
        <div className={handleImagesClass}>
          <Button action={true} disabled={disabled} handleClick={this.handleImages}>Get images</Button>
        </div>
      </div>
    );
  }
}

type IOnImagesCallback = (images: IImages) => void;

class ImageClassifier {
  private getImagesReact: () => IImages;
  private onImagesCallback: IOnImagesCallback;

  constructor(target?: HTMLElement) {
    if (target) {
      this.render(target);
    }
  }

  render(target: HTMLElement) {
    const comp = (
      <ImageClassifierComponent
        attachGetImages={(callback) => {
          this.getImagesReact = callback;
        }}
        handleImages={this.handleImages}
      />
    );
    ReactDOM.render(comp, target);
  }

  getImages = () => this.getImagesReact();

  onImages = (callback: IOnImagesCallback) => {
    this.onImagesCallback = callback;
  }

  handleImages = (images: IImages) => {
    if (this.onImagesCallback) {
      this.onImagesCallback(images);
    }
  }
}

const handleImagesClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const containerClass = css`
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
overflow: hidden;
min-height: 380px;
background: #f9f9f9;
box-shadow: 0 3px 2px rgba(0,0,0,0.15);
border-radius: 5px;
margin: 20px 0;
display: flex;
flex-direction: column;

video {
  width: 300px;
  height: 300px;
  background: black;
  border-radius: 5px;
}
`;

const headerClass = css`
  height: 25px;
  background: rgba(0,0,0,0.05);
  margin-bottom: 15px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 13px;

  span, svg {
    margin: 0 5px 0 0;
    color: rgba(0,0,0,0.5);
  }

  a {
    color: rgba(0,0,0,0.5);
    cursor: pointer;
  }
`;

const chooserClass = css`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 20px;
`;

const orClass = css`
  margin: 5px 0;
  &:after {
    display: block;
    content: "Or";
    width: 100%;
  }
`;

const leftClass = css`
  text-align: left;
  flex: 1;
`;

const rightClass = css`
  text-align: right;
  flex: 1;
`;

export default ImageClassifier;
