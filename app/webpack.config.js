const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const PAGES_PATH = './src';

function generateHtmlPlugins(items) {
    return items.map(name => new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name]
    }));
}

module.exports = {
    entry: {
        background: `${PAGES_PATH}/background`,
        popup: `${PAGES_PATH}/popup`
    },
    output: {
        path: path.resolve('build'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }]
    },
    plugins: [
        new CopyPlugin([{
            from: 'src',
            to: path.resolve('build'),
            ignore: ['pages/**/*']
        }]),
        ...generateHtmlPlugins([
            'background',
            'popup'
        ])
    ]
};
