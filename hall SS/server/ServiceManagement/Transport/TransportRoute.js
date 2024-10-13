const express = require("express");
const router = express.Router();
const transportController = require("../Transport/TransportController");

router.get("/", transportController.getAllTransports);
router.get("/:id", transportController.getTransportById);
router.post("/", transportController.createTransport);
router.put("/:id", transportController.updateTransport);
router.delete("/:id", transportController.deleteTransport);
router.get(
  "/customer/:customerId",
  transportController.getTransportsByCustomerId
);

module.exports = router;
