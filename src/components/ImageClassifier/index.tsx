import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'emotion';
import Button from './Button';
import UI from './UI';
import Picker from './Picker';
import Video from './Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUndo,
  faChevronLeft,
  faCameraRetro,
  faImages,
} from '@fortawesome/free-solid-svg-icons'

interface IProps {
}

interface IState {
  rotate: number;
  input: string | null;
  capturing: string | null;
  images: {
    [index: string]: string[];
  };
}

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

class ImageClassifierComponent extends React.Component<IProps, IState> {
  state: IState = {
    input: null,
    rotate: 0,
    capturing: null,
    images: {},
  };

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

  reset = () => this.setState({
    images: {},
  });

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

  capture = (pixels: any) => {
    const {
      capturing,
      images,
    } = this.state;

    if (!capturing) {
      throw new Error('Capture called without an active category');
    }

    if (!images[capturing]) {
      images[capturing] = [];
    }

    images[capturing].push(pixels);

    this.setState({
      images,
    });
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
              handleClick={() => this.setInput('images')}
            >
              <FontAwesomeIcon icon={faImages} />
              Images
            </Button>
          </div>
        </div>
      );
    }

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
        <UI
          rotate={this.state.rotate}
          handleClick={this.handleClick}
          handleMouseDown={this.handleMouseDown}
          images={this.state.images}
        >
          {this.state.input === 'webcam' ? (
            <Video capture={this.state.capturing ? this.capture : undefined} />
          ) : (
            <Picker />
          )}
        </UI>
      </div>
    );
  }
}

class ImageClassifier {
  render(target: HTMLElement) {
    ReactDOM.render(<ImageClassifierComponent />, target);
  }
}

export default ImageClassifier;
