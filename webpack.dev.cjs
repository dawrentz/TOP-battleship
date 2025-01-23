const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");
// import { merge } from "webpack-merge";
// import common from "./webpack.common.js"; // Adjusted for ES6 module syntax

module.exports = merge(common, {
  // export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    watchFiles: ["./src/template.html"],
    client: {
      logging: "none", //disable HMR logs
      // overlay: false,  //disable error overlay
    },
  },
});
