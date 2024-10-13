const express = require("express");
const router = express.Router();
const beauticianController = require("../Beautician/BeauticianController");

router.get("/", beauticianController.getAllBeauticians);
router.get("/:id", beauticianController.getBeauticianById);
router.post("/", beauticianController.createBeautician);
router.put("/:id", beauticianController.updateBeautician);
router.delete("/:id", beauticianController.deleteBeautician);
router.get(
  "/customer/:customerId",
  beauticianController.getBeauticiansByCustomerId
);

module.exports = router;
