const mongoose = require("mongoose");

const HeshSchema = new mongoose.Schema(
  {
    hesh: { type: String, unique: true, required: true },
    creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hesh", HeshSchema);