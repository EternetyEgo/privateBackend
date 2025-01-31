const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/token");
const bcrypt = require("bcrypt");
const config = require("config");

// get user
router.get("/me", auth, (req, res, next) => {
  const user = req.user;
  res.json({
    message: user,
  });
});

// sign
router.post("/register", async (req, res) => {
  const { username, email, password, about } = req.body;

  if (!username || !email || !password || !about) {
    return res.status(400).json({ message: "Barcha maydonlar to'ldirilishi kerak" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      about,
      password: passwordHash,
    });
    await newUser.save();
    return res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli ro'yhatdan o'tdi" });
  } catch (error) {
    return res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!password) return res.status(400).json("Ma'lumot to'liq eas");

  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ message: "Username yoki parol hato" });

  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) return res.status(400).json({ message: "Parol yoki Username hato" });

  const token = jwt.sign({ user: user._id }, config.get("tokenPrivateKey"));
  res.json({ message: "Token yaratildi", token });
});

// update user
router.post("/update", auth, async (req, res) => {
  const { username, email, password } = req.body;
  const config = require("config");
  const authUser = await User.findOne({ username: req.user.username });
  if (!authUser) return res.status(404).send("User not found");
  try {
    authUser.username = username;
    authUser.email = email;
    authUser.password = password;
    await authUser.save();
    res.json({
      message: "User yangilandi",
      authUser,
    })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
