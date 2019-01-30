import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import '@tensorflow/tfjs';

import components from './components';

interface IProps {
  component: any;
}

class Renderer extends React.Component<IProps> {
  handleRef = (ref: HTMLElement | null) => {
    if (ref) {
      this.props.component(ref);
    }
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <div ref={this.handleRef} />
    );
  }
}

components.reduce((stories, { label, component }) => {
  return stories.add(label, () => (
    <Renderer
      component={component}
    />
  ));
}, storiesOf('@dljsbook/components', module));
