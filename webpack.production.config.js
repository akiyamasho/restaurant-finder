let webpack = require('webpack');

module.exports = {
    entry: [
        "./src/index.js"
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "react-hot-loader/webpack!babel-loader"
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: __dirname + "dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};