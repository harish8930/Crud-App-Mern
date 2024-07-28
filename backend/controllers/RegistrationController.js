const Registration = require("../Models/RegistrationModels");
const upload = require("../middleware/multer");

exports.createRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Required Fields Are Missing");
    }
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const data = await Registration.create({
      ...req.body,
      image: imagePath,
      createdAt: new Date(),
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllRegistration = async (req, res) => {
  try {
    const data = await Registration.find({});
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateRegistration = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
        throw new Error("Required Fields Are Missing");
      }
      const updateData = { firstName, lastName, email, password };
      if (req.file) {
        const imagePath = `/uploads/${req.file.filename}`;
        updateData.image = imagePath;
      }
      const updatedData = await Registration.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedData) {
        return res.status(404).json({
          message: "Record Not Found",
        });
      }
      res.status(200).json({
        success: true,
        updatedData,
      });
    } catch (error) {
      res.status(500).json({ message: " Server Error" });
    }
  },
];

exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Registration.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({
        message: "Record Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Record is Deleted SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
