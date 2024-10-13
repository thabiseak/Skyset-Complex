const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSetupSchema = new Schema(
  {
    TotalEvent: {
      type: [],
      required: true,
    },
    TotalInventory: {
      type: [],
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
    security: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventPlanning", employeeSetupSchema);
