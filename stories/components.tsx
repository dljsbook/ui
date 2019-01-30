import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/Button';
import ActivationFunctions from '../src/components/ActivationFunctions';
import MNISTPainter from '../src/components/MNISTPainter';
import ImageClassifier from '../src/components/ImageClassifier';

const noop = () => {};

const btn = (
  <Button handleClick={noop}>foo</Button>
);

const components: {
  label: string;
  component: (target: HTMLElement) => void;
}[] = [{
  label: 'Button',
  component: (target: HTMLElement) => {
    ReactDOM.render(btn, target);
  },
}, {
  label: 'Activation Functions',
  component: (target) => {
    const afns = new ActivationFunctions();
    afns.render(target);
  },
}, {
  label: 'MNIST Painter',
  component: (target) => {
    const mnist = new MNISTPainter();
    mnist.render(target);
  },
}, {
  label: 'Image Classifier',
  component: (target) => {
    const imageClassifier = new ImageClassifier();
    imageClassifier.render(target);
  },
}];

export default components;
