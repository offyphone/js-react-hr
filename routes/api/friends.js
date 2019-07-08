const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/friends
// @desc    Get all friends (from current user)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = await Profile.find({ user: user });
    res.json(profile.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/friends
// @desc    Post request to get a friend
// @access  Private
router.post("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const targetProfile = await Profile.findById(req.params.id);

    const profile = await Profile.findOne({ user: user });
    const check = await Profile.find({ friends: targetProfile });
    if (check.length === 0) {
      profile.friends.push(targetProfile);
    } else {
      await profile.save();
      return res.status(500).json(profile);
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
