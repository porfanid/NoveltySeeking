// webpack.config.js

const path = require('path');
const webpack = require('webpack');

module.exports = {
    // Other webpack configurations...
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/"),
            "url": require.resolve("url/"),
            "https": require.resolve("https-browserify"),
            "querystring": require.resolve("querystring-es3")
        }
    }
    // Other webpack configurations...
};
