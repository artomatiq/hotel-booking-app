const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const authenticated = await bcrypt.compare(req.body.password, user.password);
    if (!authenticated) return next(createError(400, "Wrong username or password"));

    const { password, isAdmin, ...details } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("access_token", token, { httpOnly: true})
      .status(200)
      .json({ ...details });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
