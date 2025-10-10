const UserModel = require("../models/User");

const createUser = async (req, res, next) => {
  const newUser = new UserModel(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) return next(createError(404, "user not found"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return next(createError(404, "user not found"));
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "user not found"));
    }
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) return next(createError(404, "user not found"));
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(createError(404, "user not found"));
    }
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
