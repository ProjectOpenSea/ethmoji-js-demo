const webpack = require("webpack");
const express = require("express");
const config = require("./webpack.config");
const port = process.env.PORT || 5000;
const path = require("path");

const compiler = webpack(config);

const app = express();

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));

// Serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/example/index.html"));
});

app.listen(port, () => console.log(`Listening at localhost:${port}`));
