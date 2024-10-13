const Payment = require("../Payment/PaymentModel");

//Get All Payment
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { customerId, 
      cardNumber,
      expiryDate,
      cvc,
      cardHolderName,
      cardHolderBankName, } =
      req.body;

    if (!customerId ||
       !cardNumber || 
       !expiryDate || 
       !cvc || 
       !cardHolderName || 
       !cardHolderBankName) 
       {
      return res.status(400).json({ errorMessage: "All fields are required" });
   }

    if (!/^\d{16}$/.test(cardNumber)) {
      return res
        .status(400)
        .json({ errorMessage: "Card number must be 16 digits" });
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res
        .status(400)
        .json({ errorMessage: "Expiry date must be in MM/YY format" });
    }

    if (!/^\d{3}$/.test(cvc)) {
      return res.status(400).json({ errorMessage: "CVC must be 3 digits" });
    }

    const payment = new Payment({
      customerId,
      cardNumber,
      expiryDate,
      cvc,
      cardHolderName,
      cardHolderBankName,
    });
    await payment.save();
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (err) {
    res.status(400).json({
      errorMessage: "All fields are required",
      error: err.message,
    });
  }
};

exports.updatePayment = async (req, res) => { 
  try {
    const { id } = req.params;
    const { cardNumber,
      expiryDate,
      cvc,
      cardHolderName, 
      cardHolderBankName, } = req.body;

    if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
      return res.status(400).json({ error: "Card number must be 16 digits" });
    }

    if (expiryDate && !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res
        .status(400)
        .json({ error: "Expiry date must be in MM/YY format" });
    }

    if (cvc && !/^\d{3}$/.test(cvc)) {
      return res.status(400).json({ error: "CVC must be 3 digits" });
    }

    const updatedpayment = await Payment.findByIdAndUpdate(
      id,
      { cardNumber, 
        expiryDate, 
        cvc, 
        cardHolderName,
        cardHolderBankName},
      { new: true }
    );
    if (!updatedpayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({
      message: "Payment updated successfully",
      payment: updatedpayment,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// exports.updatePayment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { cardNumber, expiryDate, cvc, cardHolderName } = req.body;
//     const updatedpayment = await Payment.findByIdAndUpdate(
//       id,
//       { cardNumber, expiryDate, cvc, cardHolderName },
//       { new: true }
//     );
//     if (!updatedpayment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }
//     res.json({
//       message: "payment updated successfully",
//       payment: updatedpayment,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedpayment = await Payment.findByIdAndDelete(id);
    if (!deletedpayment) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.json({ message: "payment deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Card Details of Specific User payment

exports.getPaymentsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const payments = await Payment.find({ customerId });
    if (payments.length === 0) {
      return res.status(404).json({
        message: "No payments found for the provided customer ID",
      });
    }
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
