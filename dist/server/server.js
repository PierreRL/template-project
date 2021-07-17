"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require('path');
var app = express_1.default();
var port = 8000;
app.use(express_1.default.static('public'));
if (process.env.NODE_ENV === 'development') {
    console.log('dev');
    // Setup Webpack for development
    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.dev.js');
    var compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler));
    app.use(require("webpack-hot-middleware")(compiler));
}
else {
    // Static serve the dist/ folder in production
    console.log('prod');
    app.use(express_1.default.static('dist/client/'));
}
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
