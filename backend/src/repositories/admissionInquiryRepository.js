const pool = require("../config/db");

// Create
const createAdmissionInquiry = async (data) => {

  console.log("Insert Data:", data);

  const [result] = await pool.query(

    
    `
    INSERT INTO admission_inquiries (
      school_id,
      branch_id,
      academic_year_id,
      inquiry_date,
      program_class_id,
      school_board_id,
      school_medium_id,
      preferred_start_date,
      inquiry_source,
      inquiry_status,
      assigned_staff_id,
      previous_education,
      student_name,
      father_name,
      mother_name,
      mobile_no,
      alternate_mobile,
      email,
      gender,
      blood_group,
      dob,
      class_name,
      address,
      city,
      state,
      pincode,
      emergency_contact_number,
      documents,
      parent_details,
      status,
      remarks,
      created_by
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    `,
    [
      data.school_id,
      data.branch_id,
      data.academic_year_id,
      data.inquiry_date,
      data.program_class_id,
      data.school_board_id,
      data.school_medium_id,
      data.preferred_start_date,
      data.inquiry_source,
      data.inquiry_status,
      data.assigned_staff_id,
      data.previous_education,
      data.student_name,
      data.father_name,
      data.mother_name,
      data.mobile_no,
      data.alternate_mobile,
      data.email,
      data.gender,
      data.blood_group,
      data.dob,
      data.class_name,
      data.address,
      data.city,
      data.state,
      data.pincode,
      data.emergency_contact_number,
      JSON.stringify(data.documents || {}),
      JSON.stringify(data.parent_details || {}),
      data.status,
      data.remarks,
      data.created_by
    ]
  );

  return result;
};

// Get All
const getAllAdmissionInquiries = async () => {
  const [rows] = await pool.query(`
    SELECT
      ai.*,
      s.school_name,
      sb.branch_name,
      ay.academic_year_name,
      c.class_name AS program_class_name,
      sm.medium_name,
      st.full_name AS assigned_staff_name
    FROM admission_inquiries ai
    LEFT JOIN school s
      ON ai.school_id = s.id
    LEFT JOIN school_branches sb
      ON ai.branch_id = sb.id
    LEFT JOIN academic_years ay
      ON ai.academic_year_id = ay.id
    LEFT JOIN classes c
      ON ai.program_class_id = c.id
   LEFT JOIN tbl_school_mediums sm
      ON ai.school_medium_id = sm.id
    LEFT JOIN staff st
      ON ai.assigned_staff_id = st.id
    ORDER BY ai.id DESC
  `);

  return rows;
};

// Get By School
const getAdmissionInquiriesBySchool = async (schoolId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM admission_inquiries
    WHERE school_id = ?
    ORDER BY id DESC
    `,
    [schoolId]
  );

  return rows;

};

// Get By Id
const getAdmissionInquiryById = async (id) => {

  const [rows] = await pool.query(
    `
    SELECT
      ai.*,
      s.school_name,
      sb.branch_name,
      ay.academic_year_name,
      c.class_name AS program_class_name,
      sm.medium_name,
      st.full_name AS assigned_staff_name
    FROM admission_inquiries ai
    LEFT JOIN school s
      ON ai.school_id = s.id
    LEFT JOIN school_branches sb
      ON ai.branch_id = sb.id
    LEFT JOIN academic_years ay
      ON ai.academic_year_id = ay.id
    LEFT JOIN classes c
      ON ai.program_class_id = c.id
    LEFT JOIN tbl_school_mediums sm
      ON ai.school_medium_id = sm.id
    LEFT JOIN staff st
      ON ai.assigned_staff_id = st.id
    WHERE ai.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Update
const updateAdmissionInquiry = async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE admission_inquiries
    SET
      school_id = ?,
      branch_id = ?,
      academic_year_id = ?,
      inquiry_date = ?,
      program_class_id = ?,
      school_board_id = ?,
      school_medium_id = ?,
      preferred_start_date = ?,
      inquiry_source = ?,
      inquiry_status = ?,
      assigned_staff_id = ?,
      previous_education = ?,
      student_name = ?,
      father_name = ?,
      mother_name = ?,
      mobile_no = ?,
      alternate_mobile = ?,
      email = ?,
      gender = ?,
      blood_group = ?,
      dob = ?,
      class_name = ?,
      address = ?,
      city = ?,
      state = ?,
      pincode = ?,
      emergency_contact_number = ?,
      documents = ?,
      parent_details = ?,
      status = ?,
      remarks = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.school_id,
      data.branch_id,
      data.academic_year_id,
      data.inquiry_date,
      data.program_class_id,
      data.school_board_id,
      data.school_medium_id,
      data.preferred_start_date,
      data.inquiry_source,
      data.inquiry_status,
      data.assigned_staff_id,
      data.previous_education,
      data.student_name,
      data.father_name,
      data.mother_name,
      data.mobile_no,
      data.alternate_mobile,
      data.email,
      data.gender,
      data.blood_group,
      data.dob,
      data.class_name,
      data.address,
      data.city,
      data.state,
      data.pincode,
      data.emergency_contact_number,
      JSON.stringify(data.documents || {}),
      JSON.stringify(data.parent_details || {}),
      data.status,
      data.remarks,
      data.updated_by,
      id
    ]
  );

  return result;
};
// Delete
const deleteAdmissionInquiry = async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM admission_inquiries
    WHERE id = ?
    `,
    [id]
  );

  return result;

};

const checkDuplicateInquiry = async (mobile_no, academic_year_id) => {
  const [rows] = await pool.query(
    `
    SELECT id
    FROM admission_inquiries
    WHERE mobile_no = ?
      AND academic_year_id = ?
    `,
    [mobile_no, academic_year_id]
  );

  return rows;
};

const searchAdmissionInquiry = async (keyword) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM admission_inquiries
    WHERE
      student_name LIKE ?
      OR mobile_no LIKE ?
      OR email LIKE ?
    ORDER BY id DESC
    `,
    [
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`
    ]
  );

  return rows;
};

const getAdmissionInquiryByStatus = async (status) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM admission_inquiries
    WHERE inquiry_status = ?
    ORDER BY id DESC
    `,
    [status]
  );

  return rows;
};

const getAdmissionInquiryByAssignedStaff = async (staffId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM admission_inquiries
    WHERE assigned_staff_id = ?
    ORDER BY id DESC
    `,
    [staffId]
  );

  return rows;
};
module.exports = {
  createAdmissionInquiry,
  getAllAdmissionInquiries,
  getAdmissionInquiriesBySchool,
  getAdmissionInquiryById,
  updateAdmissionInquiry,
  deleteAdmissionInquiry,
  checkDuplicateInquiry,
  searchAdmissionInquiry,
  getAdmissionInquiryByStatus,
  getAdmissionInquiryByAssignedStaff
};