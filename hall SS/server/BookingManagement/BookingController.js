const Booking = require("../BookingManagement/BookingModel");
const HallModel = require("../HallManagement/HallManagement.model");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  console.log("1");
  try {
    const {
      customerId,
      name,
      address,
      mobile,
      nic,
      eventDate,
      guestCount,
      foodMenu,
      alcoholService,
      advancePayment,
      hallID,
    } = req.body;

    // Check if all required fields are provided
    if (
      !customerId ||
      !name ||
      !address ||
      !mobile ||
      !nic ||
      !eventDate ||
      !guestCount ||
      !foodMenu ||
      !hallID ||
      advancePayment === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate NIC number
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(nic)) {
      return res.status(400).json({
        error: "Invalid NIC",
      });
    }
    // Check if the hall is available for the booking date
    const doc = await HallModel.findOne({ _id: hallID });
    if (doc) {
      const isDateBooked = doc.bookedDate.some(
        (booking) =>
          booking.date.toDateString() === new Date(eventDate).toDateString()
      );
      if (isDateBooked) {
        console.log("Date is already booked");
        return res.status(400).json({ error: "Date is already booked" });
      }

      // Create the booking
      const booking = new Booking({
        customerId,
        name,
        address,
        mobile,
        nic,
        eventDate,
        guestCount,
        foodMenu,
        alcoholService,
        advancePayment,
        hallID,
      });

      // Adding the booking date to the hall
      doc.bookedDate.push({
        bookingId: booking._id,
        date: new Date(eventDate),
      });
      await doc.save();

      // Save the booking
      await booking.save();

      return res
        .status(201)
        .json({ message: "Booking created successfully", booking });
    } else {
      console.log("Hall not found");
      return res.status(404).json({ error: "Hall not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// exports.updateBooking = async (req, res) => {
//   try {
//     const {hallID } = req.params;
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
//     const updatedbooking = await Booking.findByIdAndUpdate(
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
//     if (!updatedbooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json({
//       message: "Booking updated successfully",
//       booking: updatedbooking,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      mobile,
      nic,
      eventDate,
      guestCount,
      foodMenu,
      alcoholService,
      advancePayment,
      hallID,
    } = req.body;

    // Validate all fields are provided
    if (
      !name ||
      !address ||
      !mobile ||
      !nic ||
      !eventDate ||
      !guestCount ||
      !foodMenu ||
      !hallID ||
      advancePayment === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate NIC number
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(nic)) {
      return res.status(400).json({
        error: "Invalid NIC ",
      });
    }

    const doc = await HallModel.findOne({ _id: hallID });
    if (doc) {
      const isDateBooked = doc.bookedDate.some((booking) => {
        // Exclude the current booking being edited
        if (booking.bookingId === id) {
          return false;
        }
        // Check if any other booking on the same date exists
        console.log("11");
        return (
          booking.date.toDateString() === new Date(eventDate).toDateString()
        );
      });

      if (isDateBooked) {
        console.log(isDateBooked);
        console.log("Date is already booked");
        return res.status(400).json({ error: "Date is already booked" });
      }
      //
      const existingBookingIndex = doc.bookedDate.findIndex(
        (booking) => booking.bookingId === id
      );

      if (existingBookingIndex !== -1) {
        doc.bookedDate[existingBookingIndex].date = eventDate;
        console.log("Existing date updated for bookingId:", id);
      } else {
        doc.bookedDate.push({ bookingId: id, date: eventDate });
        console.log("New booking added to bookedDate array:", {
          bookingId: id,
          date: newDate,
        });
        await doc.save();
      }
      //

      const updatedbooking = await Booking.findByIdAndUpdate(
        id,
        {
          name,
          address,
          mobile,
          nic,
          eventDate,
          guestCount,
          foodMenu,
          alcoholService,
          advancePayment,
          hallID,
        },
        { new: true }
      );
      if (!updatedbooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json({
        message: "Booking updated successfully",
        booking: updatedbooking,
      });
    } else {
      console.log("Hall not found");
      return res.status(404).json({ error: "Hall not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Booking.findOne({ _id: id });
    if (doc) {
      const userBooking = await Booking.findOne({ _id: id });
      const bookingID = userBooking.hallID;
      // countiue to detete
      const result = await HallModel.updateOne(
        { _id: bookingID },
        { $pull: { bookedDate: { bookingId: id } } }
      );
      if (result.nModified > 0) {
        console.log(
          `Booking with bookingId ${id} removed successfully`
        );
      } else {
        console.log(`Booking with bookingId ${id} not found`);
      }
    }

    const deletedbooking = await Booking.findByIdAndDelete(id);
    if (!deletedbooking) {
      console.log(deletedbooking);
      return res.status(404).json({ message: "booking not found" });
    }
    res.json({ message: "booking deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All booking

exports.getBookingsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await Booking.find({ customerId });
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the provided customer ID" });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// hall
const addDateToBookedDates = async (newDate, hallID, bookingID) => {
  try {
    const doc = await HallModel.findOne({ _id: hallID });
    if (doc) {
      const isDateBooked = doc.bookedDate.some(
        (booking) =>
          booking.date.toDateString() === new Date(newDate).toDateString()
      );
      if (isDateBooked) {
        console.log("Date is already booked");
        return res.status(400).json({ error: "Date is already booked" });
      }

      const existingBookingIndex = doc.bookedDate.findIndex(
        (booking) => booking.bookingId === bookingID
      );

      if (existingBookingIndex !== -1) {
        doc.bookedDate[existingBookingIndex].date = newDate;
        console.log("Existing date updated for bookingId:", bookingID);
      } else {
        doc.bookedDate.push({ bookingId: bookingID, date: newDate });
        console.log("New booking added to bookedDate array:", {
          bookingId: bookingID,
          date: newDate,
        });
      }

      await doc.save();
      console.log("New date added to bookedDate array:", newDate);
    } else {
      console.log("Document not found");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throwing the error to be caught in the calling function
  }
};
