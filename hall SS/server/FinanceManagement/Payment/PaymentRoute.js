const express = require("express");
const router = express.Router();
const paymentController = require("../Payment/PaymentController");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);
router.get(
  "/customer/:customerId",
  paymentController.getPaymentsByCustomerId
);

module.exports = router;
