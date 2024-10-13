const express = require("express");
const router = express.Router();
const photographyController = require("../Photography/PhotographyController");

router.get("/", photographyController.getAllPhotography);
router.get("/:id", photographyController.getPhotographyById);
router.post("/", photographyController.createPhotography);
router.put("/:id", photographyController.updatePhotography);
router.delete("/:id", photographyController.deletePhotography);
router.get(
  "/customer/:customerId",
  photographyController.getPhotographyByCustomerId
);

module.exports = router;
