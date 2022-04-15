const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let outputPath = path.resolve("./public");
let publicPath = "/";
let DotEnv;

const mode = process.env.NODE_ENV || "production";

module.exports = {
  mode,
  devServer: {
		port: 9000,
		historyApiFallback: true,
		allowedHosts: 'all',
		hot: false,
		client: {
			logging: 'none',
			overlay: false,
			progress: false
    }
  },
  entry: {
  	lib: "./src/index.tsx",
  	demo: "./src/demo.tsx"
  },
  output: {
    path: outputPath,
    filename: "js/[name].js",
    chunkFilename: "js/[name].bundle.js",
    publicPath,
  },
  resolve: {
    fallback: {
      fs: "empty",
      module: "empty",
    },
    extensions: [".js", ".ts", ".tsx", ".mjs"],
  },
  devtool: mode === "development" ? "eval" : "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-env",
            "@babel/preset-typescript",
          ],
          // plugins: [
          //   "relay",
          //   "@babel/plugin-proposal-optional-chaining",
          //   "@babel/plugin-syntax-dynamic-import",
          //   "@babel/plugin-proposal-class-properties",
          //   "@babel/plugin-transform-runtime",
          //   "@babel/plugin-proposal-export-default-from",
          // ],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ([
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 5,
              modules:{
                localIdentName: mode !== 'development' ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]',
                mode: "global"
              }
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions:{
                parser: "postcss-scss",
                plugins: () => {
                  return [
                    autoprefixer({ browsers: 'last 2 versions' }),
                  ]
                }
              }
            },
          },
          {
            loader: "sass-loader",
            options: {},
          },
        ]),
      },
      {
				test: /\.(png|jpg|gif|svg|eot|ttf|otf|woff|woff2|ico)$/,
				type: 'asset/resource'
			}
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        "dashboard-vendor": {
          name: "dashboard-vendor",
          chunks: "initial",
          enforce: true,
          test(module) {
            return /\/node_modules/.test(module.resource);
          }
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    autoprefixer,
    mode === 'development' ?
    (
      DotEnv = require('dotenv-webpack'),
      new DotEnv()
    ) : (
      new webpack.EnvironmentPlugin(["ApiURL", "BugsnagKey"])
    ),
    new HtmlWebpackPlugin({
      template: "index.ejs",
      templateParameters: {
        production: mode === "production",
      }
    })
  ],
};
