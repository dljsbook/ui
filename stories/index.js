"use strict";
exports.__esModule = true;
var react_1 = require("@storybook/react");
// import '@tensorflow/tfjs';
var components_1 = require("./components");
components_1["default"].reduce(function (stories, _a) {
    var label = _a.label, component = _a.component;
    return stories.add(label, component);
}, react_1.storiesOf('@dljsbook/components', module));
