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

const disabledClass = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgba(255,255,255,0.8);

  &:before {
    content: 'There was a problem loading webcam';
    text-align: center;
  }

  &:after {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 24px;
    margin-top: 20px;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    content: "\f071";
  }
`;

class Webcam {
  private container: HTMLDivElement;
  private disabled: HTMLDivElement;
  private resolved: boolean = false;
  private video: HTMLVideoElement;
  private stream: any;
  private width:number;
  private height:number;

  constructor(target?: HTMLElement, props: IProps = {}) {
    this.width = props.width || defaultProps.width;
    this.height = props.height || defaultProps.height;

    this.container = document.createElement('div');
    this.video = document.createElement('video');
    this.video.width = this.width;
    this.video.height = this.height;
    this.video.autoplay = true;
    this.video.classList.add(videoClass);
    this.container.appendChild(this.video);
    if (target) {
      target.appendChild(this.container);
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

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(MEDIA_PARAMS);

      this.video.srcObject = this.stream;

      this.video.oncanplay = () => {
        this.resolved = true;
        resolve();
      };
    } catch(err) {
      reject('Could not start webcam');
    }
  });

  getVideo = async () => {
    try {
      await this.setup();
    } catch(err) {
      if (!this.disabled) {
        this.disabled = document.createElement('div');
        this.disabled.classList.add(disabledClass);
        this.container.appendChild(this.disabled);
      }
    }
    return this.video;
  }

  disconnect = () => {
    if (this.stream) {
      (this.stream.getTracks() || []).forEach((track: any) => track.stop());
    }
    this.video.src = "";
  }
}

export default Webcam;
