const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.static("public"));
  app.use(cors());
  app.use("/api/user", require("../routers/User"));
  app.use("/api/hesh", require("../routers/Hesh"));
  app.use("/api/note", require("../routers/Note"));
};