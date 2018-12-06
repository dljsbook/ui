import { storiesOf } from '@storybook/react';
// import '@tensorflow/tfjs';

import components from './components';

components.reduce((stories, { label, component }) => {
  return stories.add(label, component);
}, storiesOf('@dljsbook/components', module));
