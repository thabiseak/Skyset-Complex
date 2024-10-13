const Transport = require("../Transport/TransportModel");

exports.getAllTransports = async(req, res) => {
    try {
        const transports = await Transport.find();
        res.json(transports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTransportById = async(req, res) => {
    try {
        const transport = await Transport.findById(req.params.id);
        if (!transport) {
            return res.status(404).json({ message: "transport not found" });
        }
        res.json(transport);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTransport = async(req, res) => {
    try {
        const {
            customerId,
            name,
            email,
            mobile,
            weddingDate,
            methodOfContact,
            typeOfVehicle,
            //preferredColor,
            //totalGuest,
            //totalVehicle,
            additionalService,
            //serviceDuration,
            pickupLocation,
            anyRequest,
        } = req.body;

        // Check if all required fields are provided
        if (!customerId ||
            !name ||
            !email ||
            !mobile ||
            !weddingDate ||
            !methodOfContact ||
            !typeOfVehicle ||
            //!preferredColor ||
            //!totalGuest ||
            //!totalVehicle ||
            !additionalService ||
            //!serviceDuration ||
            !pickupLocation ||
            !anyRequest
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate mobile number
        if (!/^\d{10}$/.test(mobile)) {
            return res
                .status(400)
                .json({ error: "Mobile number must be 10 digits long" });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const transport = new Transport({
            customerId,
            name,
            email,
            mobile,
            weddingDate,
            methodOfContact,
            typeOfVehicle,
            //preferredColor,
            //totalGuest,
            //totalVehicle,
            additionalService,
            //serviceDuration,
            pickupLocation,
            anyRequest,
        });
        await transport.save();
        res
            .status(201)
            .json({ message: "Transport created successfully", transport });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// exports.updatetransport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       address,
//       mobile,
//       nic,
//       eventDate,
//       guestCount,
//       foodMenu,
//       alcoholService,
//       advancePayment,
//     } = req.body;
//     const updatedtransport = await Transport.findByIdAndUpdate(
//       id,
//       {
//         name,
//         address,
//         mobile,
//         nic,
//         eventDate,
//         guestCount,
//         foodMenu,
//         alcoholService,
//         advancePayment,
//       },
//       { new: true }
//     );
//     if (!updatedtransport) {
//       return res.status(404).json({ message: "transport not found" });
//     }
//     res.json({
//       message: "transport updated successfully",
//       transport: updatedtransport,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
exports.updateTransport = async(req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            mobile,
            weddingDate,
            methodOfContact,
            typeOfVehicle,
            //preferredColor,
            //totalGuest,
            //totalVehicle,
            additionalService,
            //serviceDuration,
            pickupLocation,
            anyRequest,
        } = req.body;

        // Validate all fields are provided
        if (!name ||
            !email ||
            !mobile ||
            !weddingDate ||
            !methodOfContact ||
            !typeOfVehicle ||
            //!preferredColor ||
            //!totalGuest ||
            //!totalVehicle ||
            !additionalService ||
            //!serviceDuration ||
            !pickupLocation ||
            !anyRequest
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate mobile number
        if (!/^\d{10}$/.test(mobile)) {
            return res
                .status(400)
                .json({ error: "Mobile number must be 10 digits long" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const updatedtransport = await Transport.findByIdAndUpdate(
            id, {
                name,
                email,
                mobile,
                weddingDate,
                methodOfContact,
                typeOfVehicle,
                //preferredColor,
                //totalGuest,
                //totalVehicle,
                additionalService,
                //serviceDuration,
                pickupLocation,
                anyRequest,
            }, { new: true }
        );
        if (!updatedtransport) {
            return res.status(404).json({ message: "transport not found" });
        }
        res.json({
            message: "transport updated successfully",
            transport: updatedtransport,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTransport = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedtransport = await Transport.findByIdAndDelete(id);
        if (!deletedtransport) {
            return res.status(404).json({ message: "transport not found" });
        }
        res.json({ message: "transport deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All transport

exports.getTransportsByCustomerId = async(req, res) => {
    try {
        const { customerId } = req.params;
        const transports = await Transport.find({ customerId });
        if (transports.length === 0) {
            return res
                .status(404)
                .json({ message: "No transports found for the provided customer ID" });
        }
        res.json(transports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Functions

function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}