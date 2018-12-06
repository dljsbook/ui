import * as vegaEmbed from 'vega-embed';

const vega = (target: HTMLElement, spec: any) => new Promise((resolve, reject) => {
  vegaEmbed.default(target, spec).then(resolve).catch(reject);
});

export default vega;
