"use strict";
const express = require("express");
const router = express.Router();
const Hesh = require("../models/Hesh");
const auth = require("../middleware/token");

router.post("/create", auth, async (req, res) => {
  const { hesh } = req.body;
  const creator = req.user._id;

  const data = new Hesh({
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

// all get card
router.get("/all", auth, async (req, res) => {
  try {
    let allData = await Hesh.find();

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
module.exports = router;
