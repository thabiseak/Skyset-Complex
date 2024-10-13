const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  customerId: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  expiryDate: { type: String, required: true },
  cvc: { type: Number, required: true },
  cardHolderName: { type: String, required: true },
  cardHolderBankName: { type: String, required: true },
  
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
