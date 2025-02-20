const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");
console.log("Webpack NODE_ENV:", process.env.NODE_ENV);

module.exports = (_, argv) => {
  const isDevelopment = argv.mode === "development";

  const PUBLIC_PATH = isDevelopment
    ? "http://localhost:3001/"
    : "https://mfa-practice-edu.vercel.app/";

  return {
    output: {
      publicPath: PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3001,
      historyApiFallback: true,
      watchFiles: [path.resolve(__dirname, "src")],
      onListening: function (devServer) {
        const port = devServer.server.address().port;

        printCompilationMessage("compiling", port);

        devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
          setImmediate(() => {
            if (stats.hasErrors()) {
              printCompilationMessage("failure", port);
            } else {
              printCompilationMessage("success", port);
            }
          });
        });
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ReactRefreshWebpackPlugin(),

      new ModuleFederationPlugin({
        name: "edu",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./injector": "./src/injector.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          "@mfa/shell-router": {
            singleton: true,
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, "public/assets"), to: "assets" },
        ],
      }),
    ],
  };
};
