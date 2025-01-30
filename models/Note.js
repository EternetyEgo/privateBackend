const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String },
    creator: {type: mongoose.Schema.ObjectId, ref: "User", required: true}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Note", NoteSchema);