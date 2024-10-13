const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUserPassword,
  updatePassword,
  updateDocument,getAll
} = require("./userController");
// const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.get("/all", getAll);
router.post("/password/:userId", updatePassword);
//Update a document
router.patch('/:id',updateDocument)

module.exports = router;
