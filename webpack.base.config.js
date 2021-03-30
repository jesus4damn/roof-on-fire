'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    devtool: 'source-map',
    plugins: [
    ],
    target: 'node',
    externals: [nodeExternals({
        modulesFromFile: true,
        whitelist: [
            /hot/,
            /^lodash/, /babel/,
            /^core-js/, /react/,/prop-types/,
            /redux/, /wavesurfer/,/formik/,/styled-components/,/react-konva/,/konva/,
            /^uuid/, 'reselect', 'xlsx', /webpack/,
            'uws', 'dmx', 'axios', /@material/
        ]
    })]
};
