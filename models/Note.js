const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    creator: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    hesh: { type: mongoose.Schema.ObjectId, ref: "Hesh", default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);