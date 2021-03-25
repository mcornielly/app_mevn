const path = require('path');
const { VueLoaderPlugin } =require('vue-loader'); 

module.exports = {
    entry: './src/app/app.js',
    output: {
        path: path.join(__dirname, '/src/public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, '/node_modules'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}