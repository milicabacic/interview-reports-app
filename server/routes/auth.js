const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const UsersModel = require("../models/Users");

router.post("/", async (req, res) => {
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

module.exports = router;
