import { useEffect, useState } from "react";

import {
  createBranch,
  updateBranch,
} from "../../services/branchService";

import {
  getSchools,
} from "../../services/schoolService";

const AddBranch = ({
  editData,
  onSuccess,
  onCancel,
}) => {

  const [loading, setLoading] = useState(false);

  const [schools, setSchools] = useState([]);

  const [formData, setFormData] = useState({

    school_id: "",

    branch_code: "",

    branch_name: "",

    branch_type: "MAIN",

    address: "",

    city: "",

    state: "",

    country: "India",

    pincode: "",

    phone: "",

    email: "",

    principal_name: "",

    establishment_date: "",

    status: "ACTIVE",

  });

  // ===========================
  // Load Schools
  // ===========================

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {

      const res = await getSchools();

      setSchools(res.data || res);

    } catch (err) {

      console.log(err);

    }
  };

  // ===========================
  // Edit Mode
  // ===========================

  useEffect(() => {

    if (editData) {

      setFormData({

        school_id:
          editData.school_id || "",

        branch_code:
          editData.branch_code || "",

        branch_name:
          editData.branch_name || "",

        branch_type:
          editData.branch_type || "MAIN",

        address:
          editData.address || "",

        city:
          editData.city || "",

        state:
          editData.state || "",

        country:
          editData.country || "India",

        pincode:
          editData.pincode || "",

        phone:
          editData.phone || "",

        email:
          editData.email || "",

        principal_name:
          editData.principal_name || "",

        establishment_date:
          editData.establishment_date
            ?.split("T")[0] || "",

        status:
          editData.status || "ACTIVE",

      });

    }

  }, [editData]);

  // ===========================
  // Handle Change
  // ===========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ===========================
  // Submit
  // ===========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (editData) {

        await updateBranch(
          editData.branch_id,
          formData
        );

      } else {

        await createBranch(
          formData
        );

      }

      onSuccess();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

    return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        {editData ? "Update Branch" : "Add Branch"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* ===========================
            Basic Information
        ============================ */}

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold border-b pb-2">
            Basic Information
          </h3>
        </div>

        {/* School */}

        <div>

          <label className="block mb-2 font-medium">
            School
          </label>

          <select
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select School
            </option>

            {schools.map((school) => (

              <option
                key={school.id}
                value={school.id}
              >
                {school.school_name}
              </option>

            ))}

          </select>

        </div>

        {/* Branch Code */}

        <div>

          <label className="block mb-2 font-medium">
            Branch Code
          </label>

          <input
            type="text"
            name="branch_code"
            value={formData.branch_code}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
            placeholder="e.g. BR001"
          />

        </div>

        {/* Branch Name */}

        <div>

          <label className="block mb-2 font-medium">
            Branch Name
          </label>

          <input
            type="text"
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
            placeholder="Main Campus"
          />

        </div>

        {/* Branch Type */}

        <div>

          <label className="block mb-2 font-medium">
            Branch Type
          </label>

          <select
            name="branch_type"
            value={formData.branch_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="MAIN">
              MAIN
            </option>

            <option value="SUB">
              SUB
            </option>

            <option value="CAMPUS">
              CAMPUS
            </option>

            <option value="HOSTEL">
              HOSTEL
            </option>

            <option value="OTHER">
              OTHER
            </option>

          </select>

        </div>

        {/* ===========================
            Location
        ============================ */}

        <div className="md:col-span-2 mt-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Location Details
          </h3>
        </div>

                {/* Address */}

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Address
          </label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter branch address"
          />
        </div>

        {/* City */}

        <div>
          <label className="block mb-2 font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="City"
          />
        </div>

        {/* State */}

        <div>
          <label className="block mb-2 font-medium">
            State
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="State"
          />
        </div>

        {/* Country */}

        <div>
          <label className="block mb-2 font-medium">
            Country
          </label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Country"
          />
        </div>

        {/* Pincode */}

        <div>
          <label className="block mb-2 font-medium">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Pincode"
          />
        </div>

        {/* ===========================
            Contact Details
        ============================ */}

        <div className="md:col-span-2 mt-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Contact Details
          </h3>
        </div>

        {/* Phone */}

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Phone Number"
          />
        </div>

        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Email Address"
          />
        </div>

        {/* ===========================
            Administration
        ============================ */}

        <div className="md:col-span-2 mt-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Administration
          </h3>
        </div>

                {/* Principal Name */}

        <div>
          <label className="block mb-2 font-medium">
            Principal Name
          </label>

          <input
            type="text"
            name="principal_name"
            value={formData.principal_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Principal Name"
          />
        </div>

        {/* Establishment Date */}

        <div>
          <label className="block mb-2 font-medium">
            Establishment Date
          </label>

          <input
            type="date"
            name="establishment_date"
            value={formData.establishment_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Status */}

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Buttons */}

        <div className="md:col-span-2 flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading
              ? "Saving..."
              : editData
              ? "Update Branch"
              : "Save Branch"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AddBranch;