const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Message = require("../../models/Message");

const Dialog = require("../../models/Dialog");

// @route   POST api/dialogs/:id
// @desc    Create message in dialog
// @access  Private
router.post(
  "/:dialogId",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const dialog = await Dialog.findById(req.params.dialogId).populate(
        "messages.message",
        ["text", "user"]
      );
      const user = await User.findById(req.user.id)
        .select("-password")
        .select("-email");
      // Put a new message into dialog
      const newMessage = new Message({
        user: user._id,
        text: req.body.text
      });
      newMessage.save();
      dialog.last = newMessage;

      dialog.messages.push({ message: newMessage });
      dialog.last = newMessage;
      dialog.save();
      res.json(dialog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/dialogs/:id
// @desc    Get all messages from dialog
// @access  Private [Access from both participiants of conversations]
router.get("/:id", auth, async (req, res) => {
  try {
    const messages = await Dialog.findById(req.params.id)
      .populate("user.user", ["name"])
      .populate("messages.message", ["text", "user", "date"])
      .populate({
        path: "last",
        populate: { path: "user" }
      });

    // TODO: hide the password hashcode!!!
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/dialogs
// @desc    Get all dialogs for user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const userSelf = await User.findById(req.user.id);
    // Get input and output dialogs only for self

    const dialogs = await Dialog.find({ "user.user": userSelf })
      .populate("user.user", ["name", "avatar"])
      .populate("messages.message", ["text", "user"])
      .populate("last", ["text"]);

    res.json(dialogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dialogs/get-or-create/:id
// @desc    Get or create dialog ID between two user
// @access  Private
router.get("/get-or-create/:id", auth, async (req, res) => {
  try {
    const userSelf = await User.findById(req.user.id);
    const userTo = await User.findById(req.params.id);
    //console.log(`self user : ${userSelf} msg to : ${userTo}`);

    if (req.params.id && userSelf.email === userTo.email) {
      return res.status(500).json({ msg: "You cant send msg to yourself" });
    }

    const check = await Dialog.findOne({
      $and: [{ "user.user": userSelf }, { "user.user": userTo }]
    });

    console.log(check);

    if (check === null || check.length === 0) {
      const newDialog = new Dialog({
        user: [{ user: userSelf }, { user: userTo }]
      });
      await newDialog.save();
    }

    const dialog = await Dialog.findOne({
      $and: [{ "user.user": userSelf }, { "user.user": userTo }]
    }).populate("user.user", ["name", "avatar"]);

    res.json(dialog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
