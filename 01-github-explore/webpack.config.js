const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  //* Arquivo principal do webpack
  // * __dirname - Diretorio do arquivo no qual eu chamei a instrução
  entry: path.resolve(__dirname, "src", "index.tsx"),

  //* Mostra qual arquivo é de saida
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  //? Configura quais são os formatos a serem lidos na minha aplicação
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public", "index.html"),
    hot: true,
  },

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),

  //? Coloco os modulos e as regras
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/, //Expressão regular terminando com .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        }, // Integração do babel com o webpack
      },
      {
        test: /\.scss$/, //Expressão regular terminando com .css
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"], // Integração do babel com o webpack
      },
    ],
  },
};
