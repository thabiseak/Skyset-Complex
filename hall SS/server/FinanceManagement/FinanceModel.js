const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  cardOrcash: { type: String, required: true },
  cardId: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
