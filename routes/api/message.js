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
      // Check for available Dialog

      // GetOrCreate DB for self and opposite
      const check = await Dialog.findById(req.params.dialogId);
      if (check === null) {
        const newDialog = new Dialog({ _id: req.params.dialogId });
        await newDialog.save();
      }

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
    const check = await Dialog.find({
      $OR: [
        { users: [req.param.id, req.user.id] },
        { users: [req.user.id, req.param.id] }
      ]
    });
    if (check === null) {
      const newDialog = new Dialog({ users: [req.param.id, req.user.id] });
      await newDialog.save();
    }

    const messages = await Dialog.find({
      $OR: [
        { users: [req.param.id, req.user.id] },
        { users: [req.user.id, req.param.id] }
      ]
    });
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
    // Get input and output dialogs
    const dialogs = await Dialog.find({
      $or: [{ to: req.user.id }, { from: req.user.id }]
    }).select("-messages");

    res.json(dialogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
