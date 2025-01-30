"use strict";
const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

require("./server/db")(app);
require('./server/apis')(app)

app.listen(port, () => {
  console.log(`Server running ${port}`);
});