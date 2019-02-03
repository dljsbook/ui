import { css } from 'emotion';
import Webcam from '../Webcam';
import * as React from 'react';
import UI from './UI';
import Category from './Category';

interface IImages {
  [index: string]: string[];
};

const CAPTURE_TIME = 120;

interface IProps {
  capture?: (pixels: any) => void;
  handleClick: (category: string) => void;
  handleMouseDown: (category: string) => void;
  images: IImages;
}

interface IState {
  capturing: boolean;
}

const wait = (n: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, n);
});

const centerClass = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const webcamPlaceholderClass = css`
  display: flex;
  height: calc(100% - 20px);
  width: 100%;
  flex: 1;
  color: rgba(0,0,0,0.5);
  text-align: center;
  font-size: 16px;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
`;

const placeholder = (
  <div className={webcamPlaceholderClass}>Click and hold capture to record some images</div>
);

class Video extends React.Component<IProps, IState> {
  state: IState = {
    capturing: false,
  }

  private webcam: Webcam;
  private canvas?: HTMLCanvasElement;
  private video: HTMLVideoElement;
  private timer: number | any;

  handleRef = async (ref: HTMLElement | null) => {
    if (ref) {
      this.webcam = new Webcam(ref);
      this.video = await this.webcam.getVideo();
    }
  }

  componentWillUnmount = () => {
    this.webcam.disconnect();
  }

  // shouldComponentUpdate = () => false;

  componentWillReceiveProps = (nextProps: IProps) => {
    this.setState({
      capturing: nextProps.capture !== undefined,
    });

    if (this.state.capturing === false && nextProps.capture) {
      clearTimeout(this.timer);
      this.capture(nextProps.capture);
    } else if (this.state.capturing === true && nextProps.capture === undefined) {
      clearTimeout(this.timer);
    }
  }

  getVideo = async (): Promise<HTMLVideoElement> => {
    if (this.video) {
      return Promise.resolve(this.video);
    }

    await wait(100);

    return this.getVideo();
  };

  async capture(callback: (pixels: any) => void) {
    const video = await this.getVideo();

    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = video.width;
      this.canvas.height = video.height;
    }

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, video.width, video.height);
      const url = this.canvas.toDataURL();
      callback(url);
      this.timer = setTimeout(() => {
        if (this.state.capturing) {
          this.capture(callback);
        }
      }, CAPTURE_TIME);
    }
  }

  render() {
    const {
      handleClick,
      handleMouseDown,
      images,
    } = this.props;

    return (
      <UI>
        <Category
          title="One"
          handleClick={() => handleClick('one')}
          handleMouseDown={() => handleMouseDown('one')}
          images={images['one']}
          buttonText={'Capture'}
          divider={true}
        >
          {(!images['one'] || images['one'].length === 0) && placeholder}
        </Category>
        <div className={centerClass}>
          <div ref={this.handleRef} />
        </div>
        <Category
          title="Two"
          handleClick={() => handleClick('two')}
          handleMouseDown={() => handleMouseDown('two')}
          images={images['two']}
          buttonText={'Capture'}
          divider={true}
        >
          {(!images['two'] || images['two'].length === 0) && placeholder}
      </Category>
      </UI>
    );
  }
}

export default Video;
