// import buildSpec from './buildSpec';
import { FNS } from './config';
import { ACTIVATION_FUNCTION } from './types';
import getAtStep from '../../utils/getAtStep';
import drawChart from './drawChart';

interface IOptions {
  width?: number;
  height?: number;
}

class ActivationFunctions {
  render(target: HTMLElement, fn?: ACTIVATION_FUNCTION, options: IOptions = {}) {
    const fns = fn !== undefined ? [fn] : [
      ACTIVATION_FUNCTION.SIGMOID,
      ACTIVATION_FUNCTION.RELU,
      ACTIVATION_FUNCTION.TANH,
      ACTIVATION_FUNCTION.LEAKY_RELU,
    ];

    fns.forEach((key: ACTIVATION_FUNCTION) => {
      const {
        fn,
        // expr,
        // interpolate,
      } = FNS[key];


      const points: Array<{ x: number; y : number; }>= [];
      const min = -1;
      const max = 1;
      const steps = 200;
      for (let i = 0; i < steps; i++) {
        const x = getAtStep(i, steps, min, max);
        const y = fn(x);
        points.push({
          x,
          y,
        });
      }

      drawChart(target);
      // drawChart(target, points, {
      //   width: options.width,
      //   height: options.height,
      // });
    });
  }
}

export default ActivationFunctions;
export { ACTIVATION_FUNCTION } from './types';
