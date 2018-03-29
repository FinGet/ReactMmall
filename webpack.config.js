const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  devServer: {
  	port: 8088,
    historyApiFallback:{
      index: '/dist/index.html'
    }
  },
  resolve:{
    alias:{
      page : path.resolve(__dirname, 'src/page'),
      component : path.resolve(__dirname, 'src/component')
    }
  },
  module: {
  	rules: [
	    {
	      test: /\.jsx$/,
	      exclude: /(node_modules)/, // 无视node_modules文件
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['env','react']
	        }
	      }
	    },
	    {
			  test: /\.css$/,
			  use: ExtractTextPlugin.extract({
	        fallback: "style-loader",
	        use: "css-loader"
	      })
			},
			{
			  test: /\.scss$/,
			  use: ExtractTextPlugin.extract({
	        fallback: "style-loader",
	        use: ['css-loader','sass-loader']
		    })
			},
			{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
	      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
	      use: [
	        {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
	      ]
      }
	  ],
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		template: './src/index.html',  // 自定义模板文件
      favicon: './favicon.ico'
  	}),
  	// 独立css文件
  	new ExtractTextPlugin("css/[name].css"),
  	// 提出公共模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name : 'common',
  		filename : 'js/base.js'
  	})
  ]
};