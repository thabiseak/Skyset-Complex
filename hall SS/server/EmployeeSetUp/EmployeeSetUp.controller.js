//Workout Model imported
const currentModel = require("./EmployeeSetUp.model");

const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const levels = await currentModel
      .find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "customerId", // Field in your feedback schema that references the AllUser collection
        select: "firstName lastName email", // Fields to retrieve from the AllUser collection
      });
    res.status(200).json(levels);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: error.message });
  }
};

// get a single
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.findById(id);

  if (!defaultTemModel) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  res.status(200).json(defaultTemModel);
};
// filterWithCourseId

// get a by unit id
const getBookingById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.find({ bookingId: id });

  if (!defaultTemModel) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  res.status(200).json(defaultTemModel[defaultTemModel.length - 1]);
};

// create a new currentModel
const createWithoutReqBodyCheck = async (req, res) => {
  //add doc to db
  try {
    const defaultTemModel = await currentModel.create(req.body);
    res.status(200).json(defaultTemModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNew = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new document
    const defaultTemModel = await currentModel.create(req.body);
    res.status(200).json(defaultTemModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a currentModel
const deleteSinle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Volunteer Job" });
  }
  const defaultTemModel = await currentModel.findOneAndDelete({ _id: id });

  if (!defaultTemModel) {
    return res.status(400).json({ error: "No Such Volunteer Job" });
  }

  res.status(200).json(defaultTemModel);
};

// update a workout
const updateDocument = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }
  const defaultTemModel = await currentModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!defaultTemModel) {
    return res.status(400).json({ error: "No Such Workout" });
  }

  res.status(200).json(defaultTemModel);
};

module.exports = {
  getSingle,
  getAll,
  createNew,
  deleteSinle,
  updateDocument,
  createWithoutReqBodyCheck,
  getBookingById,
};
