const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Apply Authentication Restrictions
router.patch("/:userId/apply-auth-restrictions", async (req, res) => {
  try {
    const { userId } = req.params;
    const { restrictions } = req.body;
    await User.findByIdAndUpdate(userId, { restrictions });
    res
      .status(200)
      .json({ message: "Authentication restrictions applied successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
