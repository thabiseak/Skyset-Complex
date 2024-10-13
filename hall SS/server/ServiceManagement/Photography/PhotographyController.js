const Photography = require("../Photography/PhotographyModel");

exports.getAllPhotography = async (req, res) => {
  try {
    const photographys = await Photography.find();
    res.json(photographys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhotographyById = async (req, res) => {
  try {
    const photography = await Photography.findById(req.params.id);
    if (!photography) {
      return res.status(404).json({ message: "photography not found" });
    }
    res.json(photography);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPhotography = async (req, res) => {
  try {
    const {
      customerId,
      name,
      email,
      mobile,
      address,
      typeOfEvent,
      eventDate,
      contactMethod,
      totalGuest,
      preferredSession,
      desiredPhotography,
      additionalService,
      package,
      remarks,
    } = req.body;

    // Check if all required fields are provided
   
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

    const photography = new Photography({
      customerId,
      name,
      email,
      mobile,
      address,
      typeOfEvent,
      eventDate,
      contactMethod,
      totalGuest,
      preferredSession,
      desiredPhotography,
      additionalService,
      package,
      remarks,
    });
    await photography.save();
    res.status(201).json({ message: " created successfully", photography });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePhotography = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      address,
      typeOfEvent,
      eventDate,
      contactMethod,
      totalGuest,
      preferredSession,
      desiredPhotography,
      additionalService,
      package,customerId,
      remarks,
    } = req.body;

    // Validate all fields are provided
    const getParams = () => {
      return {
        columnSeparator: getValue("#columnSeparator"),
      };
    };
    const getValue = (inputSelector) => {
      var text = document.querySelector(inputSelector).value;
      switch (text) {
        case "none":
          return;
        case "tab":
          return "\t";
        default:
          return text;
      }
    };
    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const updatedphotography = await Photography.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        address,
        typeOfEvent,
        eventDate,
        contactMethod,
        totalGuest,
        preferredSession,
        desiredPhotography,
        additionalService,
        package,
        remarks,
      },
      { new: true }
    );
    if (!updatedphotography) {
      return res.status(404).json({ message: "photography not found" });
    }
    res.json({
      message: " updated successfully",
      photography: updatedphotography,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePhotography = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedphotography = await Photography.findByIdAndDelete(id);
    if (!deletedphotography) {
      return res.status(404).json({ message: "photography not found" });
    }
    res.json({ message: " deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All photographs

exports.getPhotographyByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const photographys = await Photography.find({ customerId });
    if (photographys.length === 0) {
      return res.status(404).json({
        message: "No photographys found for the provided customer ID",
      });
    }
    res.json(photographys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Functions

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
