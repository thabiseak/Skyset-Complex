const express = require("express");
const router = express.Router();
const bookingController = require("../BookingManagement/BookingController");

router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
router.get("/customer/:customerId", bookingController.getBookingsByCustomerId);

module.exports = router;
