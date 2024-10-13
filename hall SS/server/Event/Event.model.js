const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    Price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", hallSchema);
