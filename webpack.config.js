module.exports = {
    context: __dirname + '/resources',
    entry: './js/index.js',
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'public.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }

        ]
    }
}