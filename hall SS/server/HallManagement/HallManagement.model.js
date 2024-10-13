const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numberOfPerson: {
      type: String,
      required: true,
    },
    dayPrice: {
      type: String,
      required: true,
    },
    bookedDate: [
      {
        bookingId: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("hall", hallSchema);
