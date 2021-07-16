"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../../webpack.dev.js');
var path = require('path');
var app = express_1.default();
var port = 8000;
app.use(express_1.default.static('public'));
if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
}
else {
    // Static serve the dist/ folder in production
    app.use(express_1.default.static('dist'));
}
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
