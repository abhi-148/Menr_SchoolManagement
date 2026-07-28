import { useEffect, useState } from "react";

function AddAdmissionInquiry({

  onAdd,

  editingAdmissionInquiry,

  cancelEdit

}) {

  const initialState = {

    school_id: "",

    branch_id: "",

    academic_year_id: "",

    inquiry_date: "",

    program_class_id: "",

    school_board_id: "",

    school_medium_id: "",

    preferred_start_date: "",

    inquiry_source: "",

    inquiry_status: "",

    assigned_staff_id: "",

    previous_education: "",

    student_name: "",

    father_name: "",

    mother_name: "",

    mobile_no: "",

    alternate_mobile: "",

    email: "",

    gender: "",

    blood_group: "",

    dob: "",

    class_name: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    emergency_contact_number: "",

    documents: "",

    parent_details: "",

    status: "ACTIVE",

    remarks: ""

  };

  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {

    if (editingAdmissionInquiry) {

      setFormData({

        ...initialState,

        ...editingAdmissionInquiry

      });

    } else {

      setFormData(initialState);

    }

  }, [editingAdmissionInquiry]);

  const handleChange = (e) => {

    const {

      name,

      value

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd(formData);

    if (!editingAdmissionInquiry) {

      setFormData(initialState);

    }

  };

  return (

    <div className="bg-white shadow rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-semibold mb-6">

        {editingAdmissionInquiry

          ? "Update Admission Inquiry"

          : "Add Admission Inquiry"}

      </h2>

      <form

        onSubmit={handleSubmit}

        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >

                <div>
          <label className="block mb-1 font-medium">
            School ID
          </label>

          <input
            type="number"
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Branch ID
          </label>

          <input
            type="number"
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Academic Year ID
          </label>

          <input
            type="number"
            name="academic_year_id"
            value={formData.academic_year_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Inquiry Date
          </label>

          <input
            type="date"
            name="inquiry_date"
            value={formData.inquiry_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Program Class ID
          </label>

          <input
            type="number"
            name="program_class_id"
            value={formData.program_class_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            School Board ID
          </label>

          <input
            type="number"
            name="school_board_id"
            value={formData.school_board_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            School Medium ID
          </label>

          <input
            type="number"
            name="school_medium_id"
            value={formData.school_medium_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Preferred Start Date
          </label>

          <input
            type="date"
            name="preferred_start_date"
            value={formData.preferred_start_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Inquiry Source
          </label>

          <input
            type="text"
            name="inquiry_source"
            value={formData.inquiry_source}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Inquiry Status
          </label>

          <select
            name="inquiry_status"
            value={formData.inquiry_status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">
              Select Status
            </option>

          <option value="New">New</option>

<option value="Follow Up">
  Follow Up
</option>

<option value="Admission Done">
  Admission Done
</option>

<option value="Rejected">
  Rejected
</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Assigned Staff ID
          </label>

          <input
            type="number"
            name="assigned_staff_id"
            value={formData.assigned_staff_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Previous Education
          </label>

          <input
            type="text"
            name="previous_education"
            value={formData.previous_education}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

                <div>
          <label className="block mb-1 font-medium">
            Student Name
          </label>

          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Father Name
          </label>

          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Mother Name
          </label>

          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Mobile Number
          </label>

          <input
            type="text"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Alternate Mobile
          </label>

          <input
            type="text"
            name="alternate_mobile"
            value={formData.alternate_mobile}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Blood Group
          </label>

          <input
            type="text"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Date of Birth
          </label>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Class Name
          </label>

          <input
            type="text"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            State
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Emergency Contact
          </label>

          <input
            type="text"
            name="emergency_contact_number"
            value={formData.emergency_contact_number}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

                <div>
          <label className="block mb-1 font-medium">
            Documents
          </label>

          <textarea
            name="documents"
            value={formData.documents}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2"
            placeholder="Enter documents (JSON or text)"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Parent Details
          </label>

          <textarea
            name="parent_details"
            value={formData.parent_details}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2"
            placeholder="Enter parent details"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1 font-medium">
            Remarks
          </label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-2"
            placeholder="Enter remarks..."
          />
        </div>

        <div className="md:col-span-3 flex gap-3 mt-4">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {editingAdmissionInquiry
              ? "Update Inquiry"
              : "Save Inquiry"}
          </button>

          {editingAdmissionInquiry && (

            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </div>

  );

}

export default AddAdmissionInquiry;
    