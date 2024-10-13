const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    weddingDate: { type: String, required: true },
    methodOfContact: { type: String, required: true },
    typeOfVehicle: { type: String, required: true },
    //preferredColor: { type: String, required: true },
    //totalGuest: { type: String, required: true },
    //totalVehicle: { type: String, required: true },
    additionalService: { type: String, required: true },
    //serviceDuration: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    anyRequest: { type: String, required: true },
});

const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;