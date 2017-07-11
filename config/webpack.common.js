const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        vendor: './src/app/vendor',
        app: './src/app/app.module'
    },

    resolve: {
        extensions: ['.js', '.json', '.html', '.css', '.scss', '.xlf'],
        modules: [helpers.root('src'), 'node_modules']
    },

    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: ['env']
                   }
               }
           },
            // {
            //     test: /\.json$/,
            //     include: [
            //         helpers.root('public/i18n')
            //     ],
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: 'assets/i18n/[name].[ext]'
            //         }
            //     }]
            // },
            // {
            //     test: /\.htaccess$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: './.htaccess'
            //         }
            //     }]
            // },
            {
                test: /\.(scss|sass|css)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: ENV === 'production'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        // 'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.xlf$/,
                use: 'raw-loader'
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: helpers.packageSort(['vendor', 'app'])
        })
    ]
};
