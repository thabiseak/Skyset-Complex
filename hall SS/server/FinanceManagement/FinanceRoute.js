const express = require("express");
const router = express.Router();
const transactionController = require("../FinanceManagement/FinanceController");

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.get(
  "/customer/:customerId",
  transactionController.getTransactionsByCustomerId
);
router.post("/deduct-amount/:customerId", transactionController.deductAmount);

module.exports = router;
