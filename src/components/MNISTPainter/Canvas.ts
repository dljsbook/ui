import { css } from 'emotion';
import makeElement from './makeElement';

const BACKGROUND_COLORS = [
  'rgb(235, 235, 235)',
  'rgb(255, 255, 255)',
];
const PAINT_COLOR = 'rgb(0,0,0)';
// const BACKGROUND_COLORS = [
//   `rgb(${Array(3).fill(35).join(',')})`,
//   `rgb(${Array(3).fill(0).join(',')})`,
// ];
// const PAINT_COLOR = `rgb(${Array(3).fill(255).join(',')})`;

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouseIsDown: boolean = false;
  private backgroundRows: number = 28;
  private backgroundCols: number = 28;
  private pixelW:number;
  private pixelH:number;

  constructor() {
    this.canvas = makeElement('canvas', css`
      border: 1px solid black;
      cursor: pointer;
    `, {
      height: 560,
      width: 560,
    }) as HTMLCanvasElement;

    this.pixelW = this.canvas.width / this.backgroundRows;
    this.pixelH = this.canvas.height / this.backgroundCols;

    const ctx = this.canvas.getContext('2d');

    if (ctx === null) {
      throw new Error('Context is null; your browser does not support canvas');
    }
    this.ctx = ctx;

    this.canvas.onmousedown = this.onMouseDown;
    this.canvas.onmouseup = this.onMouseUp;
    this.canvas.onmousemove = this.onMouseMove;
    this.drawBackground();
  }

  drawBackground = () => {
    for (let row = 0; row < this.backgroundRows; row++) {
      for (let col = 0; col < this.backgroundCols; col++) {
        const color = BACKGROUND_COLORS[(col + row + 1) % 2];
        this.drawRect(
          color,
          col * this.pixelW,
          row * this.pixelH,
        );
      }
    }
  }

  getCanvasData = () => this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

  drawPixel = (x: number, y: number, color:string = PAINT_COLOR) => {
    if (x > this.canvas.width || y > this.canvas.height || x < 0 || y < 0) {
      return;
    }

    x = Math.floor(x / this.pixelW) * this.pixelW;
    y = Math.floor(y / this.pixelH) * this.pixelH;
    this.drawRect(color, x, y);
  }

  drawRect = (color: string, x: number, y: number, width: number = this.pixelW, height: number = this.pixelH) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height)
  }

  updateCanvasData = (data: ImageData) => this.ctx.putImageData(data, 0, 0, 0, 0, this.canvas.width, this.canvas.height);

  onMouseDown = ({ x, y }: MouseEvent) => {
    this.mouseIsDown = true;
  }

  onMouseUp = () => {
    this.mouseIsDown = false;
  }

  onMouseMove = (e: MouseEvent) => {
    if (this.ctx && this.mouseIsDown) {
      const x = e.x - 10;
      const y = e.y - 10;
      this.drawPixel(x, y);

      const getColor = (c:string, alpha:number) => {
        const cs = (c.split('(').pop() || '');
        const cs2 = (cs.split(')') || '');
        const [r,g,b] = (cs2.shift() || '').split(',');
        return `rgba(${r},${g},${b},${alpha})`;
      };
      this.drawPixel(x, y - this.pixelH, getColor(PAINT_COLOR, 0.2));
      this.drawPixel(x, y + this.pixelH, getColor(PAINT_COLOR, 0.2));
      this.drawPixel(x - this.pixelW, y, getColor(PAINT_COLOR, 0.2));
      this.drawPixel(x + this.pixelW, y, getColor(PAINT_COLOR, 0.2));

      this.drawPixel(x - this.pixelW, y - this.pixelH, getColor(PAINT_COLOR, 0.1));
      this.drawPixel(x - this.pixelW, y + this.pixelH, getColor(PAINT_COLOR, 0.1));
      this.drawPixel(x + this.pixelW, y - this.pixelH, getColor(PAINT_COLOR, 0.1));
      this.drawPixel(x + this.pixelW, y + this.pixelH, getColor(PAINT_COLOR, 0.1));
    }
  }

  render(target: HTMLElement) {
    target.appendChild(this.canvas);
  }
}

export default Canvas;
