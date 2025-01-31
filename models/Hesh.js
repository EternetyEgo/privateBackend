const mongoose = require("mongoose");

const HeshSchema = new mongoose.Schema(
  {
    hesh: { type: String, required: true},
    creator: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hesh", HeshSchema);
