export type Expr = (x: string) => string;

export enum ACTIVATION_FUNCTION {
  SIGMOID,
  TANH,
  RELU,
  LEAKY_RELU,
}
