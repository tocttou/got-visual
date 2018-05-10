/* tslint:disable */
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },

  devtool: "cheap-eval-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: "dependency",
      template: path.resolve(__dirname, "./src/index.ejs"),
      title: "GOT-Visualization"
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
            loader: "babel-loader",
            options: {
              babelrc: true,
              plugins: ["react-hot-loader/babel"]
            }
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "tsconfig.json")
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

  devServer: {
    hot: true,
    stats: "errors-only"
  },
  externals: {
    "vis": "vis"
  }
};

export default config;
