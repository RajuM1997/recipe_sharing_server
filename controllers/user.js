const User = require("../models/User.js");

const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserGoogle = async (req, res, next) => {
  const user = req.body;
  try {
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await User.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { ...others } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
    if (req.body?.role === "pending") {
      sendHostReqEmail(...others);
    } else if (updatedUser?.role === "host") {
      sendHostReqAcceptEmail(...others);
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  const userId = req.query.userId;
  const userEmail = req.query.userEmail;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ email: userEmail });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  const { ...others } = req.query;
  try {
    const user = await User.find({
      ...others,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  updateUserGoogle,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserByID,
  updateUser,
};
