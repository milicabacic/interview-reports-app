const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const UsersModel = require("../models/Users");

router.post("/login", async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  const user = await UsersModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "No users found for the given email." });
    return;
  }

  user.comparePassword(password, (err, isValid) => {
    if (isValid) {
      res.json({
        email: user.email,
        name: user.name,
        token: jwt.sign(user._id.toString(), process.env.JWT_SECRET),
      });
      return;
    }

    res.status(401).json({ message: "Email and Password does not match." });
  });
});

router.post("/register", async (req, res) => {
  const data = req.body;
  const { name, email, password } = data;

  var reg = /[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

  // handles punycode, etc using browser's own maintained implementation

  console.log(email);

  if (!reg.test(email.trim()))
    return res.status(400).json({ message: "Email pattern is not valid." });

  if (password.length <= 3)
    return res
      .status(400)
      .json({ message: "Password must contain at least 4 characters." });

  if (name.length <= 6)
    return res
      .status(400)
      .json({ message: "Name must contain at least 7 characters" });

  const existingUser = await UsersModel.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User with this email already exists." });
    return;
  }

  let user = await UsersModel.create([
    {
      name,
      email,
      password,
    },
  ]);

  res.json(user);
});

module.exports = router;
