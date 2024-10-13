const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  nic: { type: String, required: true },
  eventDate: { type: String, required: true },
  guestCount: { type: String, required: true },
  foodMenu: { type: String, required: true },
  alcoholService: { type: String, required: true },
  advancePayment: { type: String, required: true },
  hallID: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
