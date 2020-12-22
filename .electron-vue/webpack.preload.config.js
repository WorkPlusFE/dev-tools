const path = require('path');
const webpack = require('webpack');

module.exports = {
    target:'electron-preload',
    entry: {
        main: './src/main/preload.js'
    },
    output: {
        filename: 'preload.js',
        path: path.join(__dirname, '../dist/electron')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        //用babel-loader 需要把es6转化未es5
                        presets: [
                            ["env", {
                              "modules": false
                            }],
                            "stage-0"
                          ]
                    }
                },              
                exclude: /node_modules/,
            }
        ]
    },
    plugins: []
};
