/* tslint:disable */
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config: webpack.Configuration = {
  entry: ["./src/index.tsx"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      chunksSortMode: "dependency",
      template: path.resolve(__dirname, "./src/index.ejs"),
      title: "GOT-Visualization",
      production: true
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      extractComments: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],

  module: {
    loaders: [
      {
        exclude: path.resolve(__dirname, "node_modules"),
        include: path.resolve(__dirname, "src"),
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "tsconfig.prod.json")
            }
          }
        ]
      },
      {
        enforce: "pre",
        loader: "source-map-loader",
        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "vis": "vis"
  }
};

export default config;
