/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src//notifications/handler.ts',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    module: {
        rules: [
        {
            test: /\.(tsx?)$/,
            loader: 'ts-loader',
            exclude: [
            [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, '.serverless'),
                path.resolve(__dirname, '.webpack'),
            ],
            ],
            options: {
                transpileOnly: true,
                experimentalWatchApi: true,
            },
        },
        ],
    },
    resolve: {
        extensions: ['.json', '.ts'],
        symlinks: false,
        cacheWithContext: false,
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js',
    },
};
