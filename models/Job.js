const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  company: {
    type: String,
    required: true
  },
  salaryMin: {
    type: String
  },
  salaryMax: {
    type: String
  },
  description: {
    type: String
  },
  reqs: {
    type: String
  },
  special: {
    type: String
  },
  favorites: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  responses: [
    {
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile"
      },
      decline: {
        type: Boolean,
        default: false
      },
      accept: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      }
    }
  ]
});

module.exports = Message = mongoose.model("job", JobSchema);
