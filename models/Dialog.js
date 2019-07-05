const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DialogSchema = new Schema({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null
      }
    }
  ],
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  last: {
    type: String
  }
});

module.exports = Dialog = mongoose.model("dialog", DialogSchema);
