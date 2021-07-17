import express from "express";

const path = require('path');


const app = express();
const port = 8000;

app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    console.log('dev');
    // Setup Webpack for development
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.dev.js');
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler));
    app.use(require("webpack-hot-middleware")(compiler));
} else {
    // Static serve the dist/ folder in production
    console.log('prod');
    app.use(express.static('dist/client/'));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})