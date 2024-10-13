const mongoose = require("mongoose");

const photographySchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  address: { type: String },
  typeOfEvent: { type: String },
  eventDate: { type: String },
  contactMethod: { type: String },
  totalGuest: { type: String },
  preferredSession: { type: String },
  desiredPhotography: { type: String },
  additionalService: { type: String },
  package: { type: String },
  remarks: { type: String },
});

const Photography = mongoose.model("Photography", photographySchema);

module.exports = Photography;
