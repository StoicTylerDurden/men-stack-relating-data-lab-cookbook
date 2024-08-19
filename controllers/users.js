// controllers/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("users/index.ejs", { users: allUsers });
  } catch (error) {
    console.error(error);
  }
});

// Get a specific user by ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDetails = await User.findById(userId);
    res.render("users/show.ejs", { user: userDetails });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
