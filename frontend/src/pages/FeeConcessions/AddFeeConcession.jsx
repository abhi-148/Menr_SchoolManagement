import { useEffect, useState } from "react";
import {
  createFeeConcession,
  updateFeeConcession,
} from "../../services/feeConcessionService";
import { getStudents } from "../../services/studentService";
import { getFeeStructures } from "../../services/feeStructureService";

const AddFeeConcession = ({
  editData,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    fee_structure_id: "",
    concession_name: "",
    concession_mode: "PERCENTAGE",
    concession_value: "",
    remarks: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadStudents();
    loadFeeStructures();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        student_id: editData.student_id || "",
        fee_structure_id: editData.fee_structure_id || "",
        concession_name: editData.concession_name || "",
        concession_mode:
          editData.concession_mode || "PERCENTAGE",
        concession_value:
          editData.concession_value || "",
        remarks: editData.remarks || "",
        status: editData.status || "ACTIVE",
      });
    }
  }, [editData]);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFeeStructures = async () => {
    try {
      const res = await getFeeStructures();
      setFeeStructures(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editData) {
        await updateFeeConcession(
          editData.id,
          formData
        );
      } else {
        await createFeeConcession(formData);
      }

      onSuccess();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        {editData
          ? "Update Fee Concession"
          : "Add Fee Concession"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Student */}

        <div>

          <label className="block mb-2 font-medium">
            Student
          </label>

          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.student_name}
              </option>
            ))}

          </select>

        </div>

        {/* Fee Structure */}

        <div>

          <label className="block mb-2 font-medium">
            Fee Structure
          </label>

          <select
            name="fee_structure_id"
            value={formData.fee_structure_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Fee Structure
            </option>

            {feeStructures.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.id} - ₹ {item.total_amount}
              </option>
            ))}

          </select>

        </div>

        {/* Concession Name */}

        <div>

          <label className="block mb-2 font-medium">
            Concession Name
          </label>

          <input
            type="text"
            name="concession_name"
            value={formData.concession_name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Mode */}

        <div>

          <label className="block mb-2 font-medium">
            Concession Mode
          </label>

          <select
            name="concession_mode"
            value={formData.concession_mode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="PERCENTAGE">
              Percentage
            </option>

            <option value="FIXED">
              Fixed Amount
            </option>

          </select>

        </div>

        {/* Value */}

        <div>

          <label className="block mb-2 font-medium">
            Concession Value
          </label>

          <input
            type="number"
            name="concession_value"
            value={formData.concession_value}
            onChange={handleChange}
            required
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
            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>

          </select>

        </div>

        {/* Remarks */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Remarks
          </label>

          <textarea
            rows="4"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="md:col-span-2 flex justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-500 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white"
          >
            {loading
              ? "Saving..."
              : editData
              ? "Update"
              : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddFeeConcession;