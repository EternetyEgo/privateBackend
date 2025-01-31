"use strict";
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Hesh = require("../models/Hesh");
const auth = require("../middleware/token");
const User = require("../models/User");

router.post("/hesh", auth, async (req, res) => {
  const { hesh } = req.body;
  const creator = req.user._id;

  const data = new Note({
    hesh,
    creator,
  });

  try {
    await data.save();

    res.json({
      status: true,
      message: "Hesh saqlandi",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Xatolik yuz berdi",
    });
  }
});

// create note
router.post("/create", auth, async (req, res) => {
  let { hesh, title, description, creator } = req.body;

  const validData = await Note.findOne({ title });
  const heshF = await Hesh.findOne({ hesh });

  const data = new Note({
    hesh: heshF,
    title: title,
    description: description,
    creator: req.user._id,
  });

  await data.save();

  res.json({
    status: true,
    message: "Chipta Saqlandi",
    data: data,
  });
});

// all get card
router.get("/all", auth, async (req, res) => {
  try {
    let allData = await Note.find();

    res.json({
      status: true,
      message: allData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

router.get("/:typre", auth, async (req, res) => {
  const { typre } = req.params;
  try {
    const hesh = await Hesh.findOne({ hesh: typre }); // To'g'ri query
    if (!hesh) {
      return res.status(404).json({ status: false, message: "Hesh topilmadi" });
    }

    let allData = await Note.find({ hesh: typre });

    res.json({
      status: true,
      data: allData, // `message` o‘rniga `data`
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

// get by id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        status: false,
        message: "Note topilmadi",
      });
    }

    res.json({
      status: true,
      message: note,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
});

// update card
router.post("/edit", auth, async (req, res) => {
  const { id, hesh, title, description } = req.body;
  const userId = req.user._id;
  try {
    const eNote = await Note.findOne({ _id: id, creator: userId });

    if (!eNote) {
      return res.status(400).json({
        status: false,
        message: "Bu Note sizga tegishli emas yoki mavjud emas",
      });
    }
    (eNote.hesh = hesh), (eNote.title = title), (eNote.description = description), await eNote.save();
    res.json({
      status: true,
      message: "Note yangilandi",
      data: eNote,
    });
  } catch (err) {
    res.json(500).json({
      status: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
});

// delete note
router.delete("/del", async (req, res) => {
  const { id } = req.body;

  const note = await Note.findById(id);

  if (!note) {
    return res.status(400).json({
      message: "Note Topilmadi",
    });
  }

  await Note.deleteOne({ _id: id });

  res.json({
    message: "Note Ochirildi",
  });
});

// filter by status

module.exports = router;
