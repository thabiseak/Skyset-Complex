const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    feedback: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId, // Assuming customerID is an ObjectId referencing the _id of another document
      ref: 'AllUser', // Name of the referenced model
      required: true
    },
    rating: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", hallSchema);
