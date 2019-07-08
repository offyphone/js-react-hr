const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DialogSchema = new Schema({
  user: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: null
      }
    }
  ],
  messages: [
    {
      message: {
        type: Schema.Types.ObjectId,
        ref: "message",
        required: true
      }
    }
  ],
  last: {
    type: Schema.Types.ObjectId,
    ref: "message",
    required: false
  }
});

module.exports = Dialog = mongoose.model("dialog", DialogSchema);
