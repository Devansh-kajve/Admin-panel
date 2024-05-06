const express = require("express");
const Database = require("../models/Database");
const router = express.Router();
const mongoose = require("mongoose");

// Create Database
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const instanceId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
    const newDatabase = new Database({ name, instanceId });
    await newDatabase.save();
    res.status(201).json({ message: "Database created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Database.findByIdAndDelete(id);
    res.status(200).json({ message: "Database deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Databases
router.get("/", async (req, res) => {
  try {
    const databases = await Database.find();
    res.status(200).json(databases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
