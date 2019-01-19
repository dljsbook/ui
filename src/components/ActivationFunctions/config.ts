import {
  ACTIVATION_FUNCTION,
} from './types';

export const FNS: {
  [index: string]: {
    fn: (x: number) => number;
    expr: (x: string) => string;
    interpolate?: boolean;
  }
} = {
  [ACTIVATION_FUNCTION.SIGMOID]: {
    fn: (x: number) => 1 / (1 + Math.exp(-1 * x)),
    expr: x => `1 / (1 + exp(-1 * ${x}))`,
    interpolate: true,
  },
  [ACTIVATION_FUNCTION.TANH]: {
    fn: (x: number) => (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1),
    expr: x => `(exp(2 * ${x}) - 1) / (1 + exp(2 * ${x}))`,
    interpolate: true,
  },
  [ACTIVATION_FUNCTION.RELU]: {
    fn: (x: number) => x > 0 ? x : 0,
    expr: x => `${x} > 0 ? ${x} : 0`,
  },
  [ACTIVATION_FUNCTION.LEAKY_RELU]: {
    fn: (x: number) => x > 0 ? x : x * 0.1,
    expr: x => `${x} > 0 ? ${x} : ${x} * 0.1`,
  },
};
