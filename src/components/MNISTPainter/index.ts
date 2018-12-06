// import vega from '../../utils/vega';

import makeElement from './makeElement';
import Canvas from './Canvas';

class MNISTPainter {
  render(target: HTMLElement) {
    const container = makeElement();
    const canvas = new Canvas();
    canvas.render(container);
    target.appendChild(container);
  }
}

export default MNISTPainter;
