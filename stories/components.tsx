import * as React from 'react';
import Button from '../src/components/Button';
import ActivationFunctions from '../src/components/ActivationFunctions';

const components = [{
  label: 'Button',
  component: () => (
    <Button handleClick={() => {}}>
      foo
    </Button>
  ),
}, {
  label: 'Activation Functions',
  component: () => (
    <ActivationFunctions />
  ),
}];

export default components;
