import { COLORS } from '../../config';

import {
  Expr,
} from './types';

interface IProps {
  interpolate?: boolean;
  fn: ((x: number) => number);
  expr: Expr;
  x?: number;
  y?: number;
  onSignalXval?: (_: any, value: number) => void;
}

const DATA_NAME = 'source';
// const Y_NAME = 'y_source';
const X_NAME = 'xpos';

const AXES = [
  { grid: true, "orient": "bottom", "scale": "xscale" },
  { grid: true, "orient": "left", "scale": "yscale" }
];

const Y_RULE = {
  "type": "rule",
  "interactive": false,
  "encode": {
    "update": {
      "x": {
        "scale": "xscale",
        "signal": X_NAME,
        "offset": 0.5
      },
      "y": {
        "value": 0
      },
      "y2": {
        "signal": "height"
      },
      "stroke": {
        "value": "orange"
      },
      "strokeWidth": {
        "value": 2
      },
      "opacity": {
        "value": 1
      }
    }
  }
};

const getSignals = (expr: Expr, x: number, y:number) => ([
  {
    "name": X_NAME,
    "value": 2,
    "on": [
      {
        "events": "mousemove",
        "update": "invert('xscale', clamp(x(), 0, width))"
      },
    ],
  },
  {
    "name": "xval",
    "value": x,
    "on": [
      {
        "events": "mousemove",
        update: X,
      },
    ],
  },
  {
    "name": "yval",
    "value": y,
    "on": [
      {
        "events": "mousemove",
        update: expr(X),
      },
    ],
  },
]);

const X_BETWEEN_ZERO_ONE = '(clamp(x(), 0, width) / width)';
const X = `(${X_BETWEEN_ZERO_ONE} * 12 - 6)`;

const getMarks = (color: any, interpolate?: boolean) => ([
  {
    "type": "line",
    "from": {"data": DATA_NAME},
    "encode": {
      "enter": {
        "x": {"scale": "xscale", "field": "x"},
        "y": {"scale": "yscale", "field": "y"},
        ...(interpolate ? {
          "interpolate": {"value": "cardinal"},
        } : {}),
        "stroke": {"value": "#555"},
        "strokeWidth": {"value": 3}
      },
    }
  },

  {
    "type": "symbol",
    "from": {"data": DATA_NAME},
    "encode": {
      "update": {
        stroke: { value: color.string() },
        fill: { value: (color as any).fade(0.5).string() },
        "strokeWidth": {"value": 2},
        "shape": "circle",
        "size": {"value": 200},
        "fillOpacity": {"value": 1.0},
        "strokeOpacity": {"value": 1.0},

        "zindex": {"value": 1},
        "x": {
          "scale": "xscale",
          "signal": X_NAME,
        },
        "y": {
          "scale": "yscale",
          "signal": "yval",
          // "field": { "group": Y_NAME },
          // "signal": "-0.5",
          // "value": 0.54,
          // "field": Y_NAME,
          // "signal": `datum.${Y_NAME} / 2`,
        },
      },
    },

  },
  Y_RULE,
]);

const SCALES = [
  {
    "name": "xscale",
    // "type": "band",
    "domain": {"data": DATA_NAME, "field": "x"},
    "range": "width",
    // "nice": true,
  },
  {
    "name": "yscale",
    "domain": {"data": DATA_NAME, "field": "y"},
    "range": "height",
    domainMin: -1,
    // domainMin: -6,
    // domainMax: 6,
    // domainMax: 1,
  }
];

const getSpec = ({
  interpolate,
  data,
  color,
  expr,
}: {
  interpolate?: boolean,
  data: {
    x: number,
    y: number,
  }[],
  color: any,
  expr: (x: string) => string,
}) => ({
  data: {
    name: DATA_NAME,
    values: data,
  },

  axes: AXES,
  signals: getSignals(expr, 0, 0),
  marks: getMarks(color, interpolate),
  scales: SCALES,
});

const getAtStep = (step: number, num: number, start: number, end: number) => start + ((end - start) * step / (num - 1));
const getData = (fn: Function, interpolate?: boolean) => {
  const start = -6;
  const end = 6;
  const steps = 20 + 1;
  // const steps = 1000 + 1;
  const g = [];
  for (let i = 0; i < steps; i++) {
    const x = getAtStep(i, steps, start, end);
    g.push({
      x,
      y: fn(x),
    });
  }
  return g;
};

const buildSpec = (props: IProps) => {
  const {
    fn,
    interpolate,
    expr,
  } = props;

  return getSpec({
    interpolate,
    data: getData(fn, interpolate),
    color: COLORS[0],
    expr: expr,
  });
};

export default buildSpec;
