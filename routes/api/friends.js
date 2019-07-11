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
    const profile = await Profile.findOne({ user: user });
    res.json(profile.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/friends/mutual/
// @desc    Get all mutual friends (from current user) with profiles
// @access  Private
router.get("/mutual", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne({ user: user });
    const friends = [];
    profile.friends.map(e => (e.mutual ? friends.push(e.user) : false));

    const frprofile = await Profile.find({ user: friends })
      .populate("user", ["name", "avatar"])
      .select("-friends");
    //console.log(frprofile);
    res.json(frprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/friends
// @desc    PUT request to get a friend
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    // You cannot send friend to yourself:
    const yourProfile = await Profile.findOne({ user: req.user.id });
    const targetProfile = await Profile.findOne({ user: req.params.id });

    if (req.user.id === req.params.id) {
      return res
        .status(500)
        .json({ msg: "You cannot send friend request to yourself" });
    }
    // Immidiatly adding friend if null
    if (
      yourProfile.friends.length === 0 ||
      !yourProfile.friends
        .map(item => item.user)
        .includes(targetProfile.user._id)
    ) {
      yourProfile.friends.push({ user: targetProfile.user });
    }

    // Check mutuality
    if (
      targetProfile.friends
        .map(item => item.user)
        .includes(yourProfile.user._id)
    ) {
      let index = targetProfile.friends
        .map(item => item.user)
        .indexOf(yourProfile.user._id);

      // find not-mutualFriend and make him mutual
      targetProfile.friends[index].mutual = true;
      // and yours friend:
      index = yourProfile.friends
        .map(item => item.user)
        .indexOf(targetProfile.user._id);
      yourProfile.friends[index].mutual = true;
    }

    await targetProfile.save();
    await yourProfile.save();
    res.json(yourProfile.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/friends
// @desc    DELETE friend or request
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const yourProfile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    const targetProfile = await Profile.findOne({
      user: req.params.id
    }).populate("user", ["name", "avatar"]);

    // find mutualFriend and make him unmutual
    let index = targetProfile.friends
      .map(item => item.user)
      .indexOf(yourProfile.user._id);
    if (targetProfile.friends[index]) {
      targetProfile.friends[index].mutual = false;
      await targetProfile.save();
    }

    // and remove your friend:
    index = yourProfile.friends
      .map(item => item.user)
      .indexOf(targetProfile.user._id);
    yourProfile.friends.splice(index, 1);

    await yourProfile.save();
    //console.log(targetProfile);
    res.json(targetProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
