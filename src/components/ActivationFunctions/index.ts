// import vega from '../../utils/vega';
// import spec from './spec.vg.json';
import buildSpec from './buildSpec';
import { FNS } from './config';
import { ACTIVATION_FUNCTION } from './types';

import { vegaEmbed } from '../../vega';

const vega = (target: HTMLElement, spec: any) => new Promise((resolve, reject) => {
  const container = document.createElement('div');
  target.appendChild(container);
  container.style.border = '1px solid black';
  vegaEmbed.default(container, spec).then(resolve).catch(reject);
});

class ActivationFunctions {
  render(target: HTMLElement, fn?: ACTIVATION_FUNCTION) {
    const fns = fn? [fn] : [
      ACTIVATION_FUNCTION.SIGMOID,
      ACTIVATION_FUNCTION.RELU,
      ACTIVATION_FUNCTION.TANH,
      ACTIVATION_FUNCTION.LEAKY_RELU,
    ];

    fns.forEach((key: ACTIVATION_FUNCTION) => {
      const {
        fn,
        expr,
        interpolate,
      } = FNS[key];

      const spec = {
        "$schema": "https://vega.github.io/schema/vega/v4.json",
        "width": 300,
        "height": 300,

        ...buildSpec({
          fn,
          expr,
          interpolate,
        }),
      };
      vega(target, spec);
    });
  }
}

export default ActivationFunctions;
export { ACTIVATION_FUNCTION } from './types';
