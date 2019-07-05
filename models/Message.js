const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  sent: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
