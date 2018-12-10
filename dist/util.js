"use strict";
exports.__esModule = true;
var nanoid_1 = require("nanoid");
var startId = nanoid_1["default"]();
var requestCount = 0;
exports.generateUnionId = function () { return startId + "_" + requestCount++; };
