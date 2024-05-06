const express = require("express");
const Instance = require("../models/Instance");
const Database = require("../models/Database");
const User = require("../models/User");
const router = express.Router();

// Add Instance
router.post("/", async (req, res) => {
  try {
    const { name, host, port } = req.body;
    const newInstance = new Instance({ name, host, port });
    await newInstance.save();
    res.status(201).json({ message: "Instance added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Instances with Database and User Counts
router.get("/", async (req, res) => {
  try {
    const instances = await Instance.find()
      .populate({
        path: "databases",
        model: "Database",
        options: { lean: true },
      })
      .populate({
        path: "users",
        model: "User",
        options: { lean: true },
      });

    const instancesWithCounts = instances.map((instance) => ({
      ...instance.toObject(),
      numDatabases: instance.databases.length,
      numUsers: instance.users.length,
    }));

    res.status(200).json(instancesWithCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
