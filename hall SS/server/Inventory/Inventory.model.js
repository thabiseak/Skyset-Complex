const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    quantityAvailable: {
      type: String,
      required: true,
    },
    quantityOnOrder: {
      type: String,
      required: true,
    },
    UnitPrice: {
      type: String,
      required: true,
    },
    TotalCost: {
      type: String,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    Condition: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inventory", hallSchema);
