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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
            'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL)
        })
    ]
    // Other webpack configurations...
};
