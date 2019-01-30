// import * as tf from '@tensorflow/tfjs';
import Webcam from '../Webcam';
import * as React from 'react';

const CAPTURE_TIME = 300;

interface IProps {
  capture?: (pixels: any) => void;
}

interface IState {
  capturing: boolean;
}

const wait = (n: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, n);
});

let last: any = null;

class Video extends React.Component<IProps, IState> {
  state: IState = {
    capturing: false,
  }

  private canvas?: HTMLCanvasElement;
  private video: HTMLVideoElement;
  private timer: number | any;

  handleRef = async (ref: HTMLElement | null) => {
    if (ref) {
      const webcam = new Webcam(ref);
      this.video = await webcam.getVideo();
    }
  }

  shouldComponentUpdate = () => false;

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
    console.log('video capture', !!last ? ((new Date()).getTime() - last.getTime()) / 1000 : 'first time');
    last = new Date();
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
    return (
      <div ref={this.handleRef} />
    );
  }
}

export default Video;
