const express = require("express");
const {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUserGoogle,
  getUserByID,
  updateUser,
} = require("../controllers/user.js");
const { createJWT } = require("../utils/verifyToken.js");

const router = express.Router();

//Create
router.post("/", createUser, createJWT);

//Update
router.put("/", updateUserGoogle);

//Update
router.put("/:id", updateUser);

//Delete
router.delete("/:id", deleteUser);

//Get
router.get("/user", getSingleUser);

//Get
router.get("/:id", getUserByID);

//Get all
router.get("/", getAllUser);

module.exports = router;
