"use strict";
exports.__esModule = true;
var React = require("react");
var Button_1 = require("../src/components/Button");
var ActivationFunctions_1 = require("../src/components/ActivationFunctions");
var components = [{
        label: 'Button',
        component: function () { return (<Button_1["default"] handleClick={function () { }}>
      foo
    </Button_1["default"]>); }
    }, {
        label: 'Activation Functions',
        component: function () { return (<ActivationFunctions_1["default"] />); }
    }];
exports["default"] = components;
