const mongoose = require("mongoose");

const beauticianSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    name: { type: String, required: true },
    //Fullname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    methodOfContact: { type: String, required: true },
    typeOfService: { type: String, required: true },
    //preferredStyle: { type: String, required: true },
    allergies: { type: String, required: true },
    dateAndTime: { type: String, required: true },
    //serviceDuration: { type: String, required: true },
    //additionalService: { type: String, required: true },
    remarks: { type: String, required: true },
});

const Beautician = mongoose.model("Beautician", beauticianSchema);

module.exports = Beautician;