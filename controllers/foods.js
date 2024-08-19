const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// Route to get all foods in the user's pantry
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", { pantry: user.pantry });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Route to new form page
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

// Route to create a new food item
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Route to get the food item
router.get("/:foodId", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.pantry.id(req.params.foodId);
    res.render("foods/show.ejs", { food: foodItem });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Route to delete a food item 
router.delete("/:foodId", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.pantry.id(req.params.foodId);
    foodItem.deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Route to render the edit form for the food item
router.get("/:foodId/edit", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.pantry.id(req.params.foodId);
    res.render("foods/edit.ejs", { food: foodItem });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

// Route to update food form
router.put("/:foodId", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodItem = user.pantry.id(req.params.foodId);
    foodItem.set(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods/${req.params.foodId}`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
