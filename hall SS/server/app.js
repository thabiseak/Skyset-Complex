const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const transactionRoutes = require("./FinanceManagement/FinanceRoute");
const bookingRoutes = require("./BookingManagement/BookingRoute");
const paymentRoutes = require("./FinanceManagement/Payment/PaymentRoute");
const transportRoutes = require("./ServiceManagement/Transport/TransportRoute");
const photographsRoutes = require("./ServiceManagement/Photography/PhotographyRoute");
const beauticianRoutes = require("./ServiceManagement/Beautician/BeauticianRoute");
const HallRoutes = require("./HallManagement/HallManagement.routes");
const FeedbackRoutes = require("./Feedback/Feedback.routes");
const EmployeeSetUpRoutesRoutes = require("./EmployeeSetUp/EmployeeSetUp.routes");
const InventoryRoutesRoutes = require("./Inventory/Inventory.routes");
const EventRoutesRoutes = require("./Event/Event.routes");
const EventPlaningRoutesRoutes = require("./EventPlaning/EventPlaning.routes");


const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Hall
app.use("/hall", HallRoutes);
app.use("/feedback", FeedbackRoutes);
app.use("/inventory", InventoryRoutesRoutes);
app.use("/event", EventRoutesRoutes);
app.use("/event-plan", EventPlaningRoutesRoutes);

// EmployeeSetUpRoutesRoutes
app.use("/employee-setup", EmployeeSetUpRoutesRoutes);

//Finance Management
app.use("/transactions", transactionRoutes);
app.use("/payments", paymentRoutes);

//Booking Management
app.use("/bookings", bookingRoutes);

//Service Management
app.use("/transports", transportRoutes);
app.use("/beautician", beauticianRoutes);
app.use("/photography", photographsRoutes);

// auth
// auth only
app.use("/auth", require("./auth/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
