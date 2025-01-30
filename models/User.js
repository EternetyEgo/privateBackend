const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  job: {type: String},
},{timestamps: true});

module.exports = mongoose.model("User", UserScheme)