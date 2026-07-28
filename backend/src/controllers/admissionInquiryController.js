const {
  createAdmissionInquiryService,
  getAllAdmissionInquiriesService,
  getAdmissionInquiryByIdService,
  updateAdmissionInquiryService,
  deleteAdmissionInquiryService,
  searchAdmissionInquiryService,
  getAdmissionInquiryByStatusService,
  getAdmissionInquiryByAssignedStaffService
} = require("../services/admissionInquiryService");

// Create
// Create
const createAdmissionInquiry = async (req, res) => {
  try {

    console.log("Request Body:", req.body);

    const result = await createAdmissionInquiryService({
      ...req.body,
      created_by: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Admission Inquiry Created Successfully",
      data: result
    });

  } catch (error) {

  console.error("========== Admission Inquiry Error ==========");
  console.error(error);

  console.error("Code:", error.code);
  console.error("SQL Message:", error.sqlMessage);
  console.error("SQL State:", error.sqlState);
  console.error("SQL:", error.sql);

  return res.status(500).json({
    success: false,
    message: error.sqlMessage || error.message
  });

}
};
// Get All
const getAllAdmissionInquiries = async (req, res) => {
  try {
    const data = await getAllAdmissionInquiriesService(req.user);

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get By Id
const getAdmissionInquiryById = async (req, res) => {
  try {
    const data = await getAdmissionInquiryByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update
const updateAdmissionInquiry = async (req, res) => {
  try {
    await updateAdmissionInquiryService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admission Inquiry Updated Successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete
const deleteAdmissionInquiry = async (req, res) => {
  try {

    await deleteAdmissionInquiryService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Admission Inquiry Deleted Successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search
const searchAdmissionInquiry = async (req, res) => {
  try {

    const data = await searchAdmissionInquiryService(
      req.query.keyword || ""
    );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
  console.error("Admission Inquiry Error:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack
  });
}
};

// Filter By Status
const getAdmissionInquiryByStatus = async (req, res) => {
  try {

    const data =
      await getAdmissionInquiryByStatusService(
        req.params.status
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Filter By Assigned Staff
const getAdmissionInquiryByAssignedStaff = async (req, res) => {
  try {

    const data =
      await getAdmissionInquiryByAssignedStaffService(
        req.params.staffId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAdmissionInquiry,
  getAllAdmissionInquiries,
  getAdmissionInquiryById,
  updateAdmissionInquiry,
  deleteAdmissionInquiry,
  searchAdmissionInquiry,
  getAdmissionInquiryByStatus,
  getAdmissionInquiryByAssignedStaff
};