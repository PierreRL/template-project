import express from "express";
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})