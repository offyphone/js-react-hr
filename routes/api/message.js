const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const Dialog = require("../../models/Dialog");

// @route   POST api/dialogs/:id
// @desc    Create dialog and message in dialog
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
      const dialog = await Dialog.findById(req.params.dialogId);
      console.log(dialog);
      //dialog.users.user.push(req.user.id);

      // Put a new message into dialog
      const newMessage = {
        from: req.user.id,
        text: req.body.text
      };
      //console.log(newMessage);

      dialog.last = req.body.text;
      //dialog.messages.push(newMessage);
      //await dialog.save();

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
    const messages = await Dialog.findById(req.params.id);
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

    const dialogs = await Dialog.find({ users: userSelf });
    res.json(dialogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dialogs/get-or-create/:id
// @desc    Get or create dialog ID between two users
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
      $or: [{ users: [userSelf, userTo] }, { users: [userTo, userSelf] }]
    });

    console.log(check);
    if (check.length === 0) {
      const newDialog = new Dialog({
        users: [userSelf, userTo]
      });
      await newDialog.save();
    }

    const dialog = await Dialog.findOne({
      $or: [{ users: [userSelf, userTo] }, { users: [userTo, userSelf] }]
    });

    res.json(dialog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
