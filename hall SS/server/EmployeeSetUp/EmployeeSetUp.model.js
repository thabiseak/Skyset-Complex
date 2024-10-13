const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSetupSchema = new Schema(
  {
    employeeSex: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId, // Assuming customerID is an ObjectId referencing the _id of another document
      ref: "AllUser", // Name of the referenced model
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId, // Assuming customerID is an ObjectId referencing the _id of another document
      ref: "Booking", // Name of the referenced model
      required: true,
    },
    employeeDressCode: {
      type: String,
    },
    theme: {
      type: String,
    },
    themeExtraInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employeeSetUp", employeeSetupSchema);
