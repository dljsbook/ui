import * as tf from '@tensorflow/tfjs';
import { css } from 'emotion';
import Canvas from 'pixelated-canvas';
import makeElement from './makeElement';

const fonts = `
  font-family: -apple-system,
  BlinkMacSystemFont,
  "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell",
  "Fira Sans", "Droid Sans",
  "Helvetica Neue", Arial, sans-serif;
`;

const predictionsClass = css`
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;
const predictionClass = css`
  display: flex;
  flex: 1;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.2);

  &:last-child {
    border-bottom: none;
  }

  label {
    width: 30px;
    flex: 0;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    padding: 10px;
  }
`;

const graphContainer = css`
  flex: 1;
  height: 80%;
`;

const graphClass = css`
  width: 0%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

class MNISTPainter {
  private model:tf.Model;
  private canvas: Canvas;
  private container: HTMLElement;
  private predictions: HTMLElement;

  render(target: HTMLElement) {
    this.container = makeElement('div', css`
      display: flex;
      flex-direction: row;
      ${fonts}
    `);
    target.appendChild(this.container);
    this.canvas = new Canvas();
    this.canvas.render(this.container);
  }

  setModel = (model: tf.Model) => {
    this.model = model;
  }

  renderPredictions = () => {
    this.predictions = makeElement('div', predictionsClass);

    for (let i = 0; i < 10; i++) {
      const prediction = makeElement('div', predictionClass);
      prediction.appendChild(makeElement('label', undefined, {
        innerHTML: i,
      }));
      const graph = makeElement('div', graphContainer);
      graph.appendChild(makeElement('div', graphClass, {
        innerHTML: '0%',
      }));
      prediction.appendChild(graph);
      this.predictions.appendChild(prediction);
    }
    this.container.appendChild(this.predictions);
  }

  showPredictions = (predictions: number[]) => {
    const preds = Array.prototype.slice.call(predictions).map((pred: number) => `${Math.round(pred * 100)}%`)
    console.log(preds.join('|'));
    preds.forEach((pred: string, index: number) => {
      const div = this.predictions.children[index].children[1].children[0];
      div.innerHTML = pred;
      div.style.width = pred;
    });
  }

  predict = async () => {
    if (!this.model) {
      throw new Error('You must provide a model with setModel');
    }

    this.renderPredictions();
    while(true) {
      console.log('go');
      const pixels = this.canvas.getPixels();
      const t = tf.tensor3d(pixels, [28, 28, 1]).expandDims(0);
      console.log(t.dataSync());
      const p: any = await this.model.predict(t);
      const predictions = p.dataSync();
      this.showPredictions(predictions);
      await tf.nextFrame();
      await wait(500);
    }
  }
}

const wait = (time: number) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default MNISTPainter;
