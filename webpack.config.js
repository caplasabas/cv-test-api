var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    experiments: {
        topLevelAwait: true
    },
    resolve: {
        fallback: {
          fs: false,
          net: false
        },
        extensions: ['.graphql', '.jsx', '.js', '.tsx', '.ts', ],
    },
    module: {
        rules: [
            {
              test: /\.ts?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ['@babel/preset-env'],
                    // targets: {
                    //     node: true,
                    // },
                },
            },
        ],
    },
    devServer: {
      static: path.join(__dirname, "dist"),
      compress: true,
      port: 4000,
    },
}