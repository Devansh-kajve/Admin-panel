const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

// Create User
router.post("/:instanceId", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const instanceId = req.params.instanceId;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      instanceId,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete User
router.delete("/:instanceId/:userId", async (req, res) => {
  try {
    const { instanceId, userId } = req.params;
    await User.findOneAndDelete({ _id: userId, instanceId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change Password
router.patch("/:instanceId/:userId/change-password", async (req, res) => {
  try {
    const { instanceId, userId } = req.params;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { _id: userId, instanceId },
      { password: hashedPassword }
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign User to Database
router.post(
  "/:instanceId/:userId/assign-database/:databaseId",
  async (req, res) => {
    try {
      const { instanceId, userId, databaseId } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: userId, instanceId },
        { $addToSet: { databases: databaseId } }
      );
      res
        .status(200)
        .json({ message: "User assigned to database successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Remove User Access from Database
router.delete(
  "/:instanceId/:userId/remove-database/:databaseId",
  async (req, res) => {
    try {
      const { instanceId, userId, databaseId } = req.params;
      const user = await User.findOneAndUpdate(
        { _id: userId, instanceId },
        { $pull: { databases: databaseId } }
      );
      res
        .status(200)
        .json({ message: "User access removed from database successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// List Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
