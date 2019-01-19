import { css } from 'emotion';

const MEDIA_PARAMS = {
  audio: false,
  video: true,
};

type IProps = {
  width?: number;
  height?: number;
};

const defaultProps = {
  width: 384,
  height: 288,
};

const videoClass = css`
  background: black;
`;

class Webcam {
  video: HTMLVideoElement;
  resolved: boolean = false;
  private width:number;
  private height:number;

  constructor(target?: HTMLElement, props: IProps = {}) {
    this.width = props.width || defaultProps.width;
    this.height = props.height || defaultProps.height;

    this.video = document.createElement('video');
    this.video.width = this.width;
    this.video.height = this.height;
    this.video.autoplay = true;
    this.video.classList.add(videoClass);
    if (target) {
      target.appendChild(this.video);
    }

    this.setup();
  }

  setup = () => new Promise(async (resolve, reject) => {
    if (this.resolved) {
      return resolve();
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      reject('Your browser does not support webcams or webcam could not be found');
    }

    const stream = await navigator.mediaDevices.getUserMedia(MEDIA_PARAMS);

    this.video.srcObject = stream;

    this.video.oncanplay = () => {
      this.resolved = true;
      resolve();
    };
  });

  getVideo = async () => {
    await this.setup();
    return this.video;
  }
}

export default Webcam;
