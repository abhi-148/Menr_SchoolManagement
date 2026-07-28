import { useEffect, useState } from "react";
import {
  createFeeDiscount,
  updateFeeDiscount,
} from "../../services/feeDiscountService";
import { getFeeStructures } from "../../services/feeStructureService";

const AddFeeDiscount = ({
  editData,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const [feeStructures, setFeeStructures] = useState([]);

  const [formData, setFormData] = useState({
    fee_structure_id: "",
    discount_name: "",
    discount_type: "PERCENTAGE",
    discount_value: "",
    start_date: "",
    end_date: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadFeeStructures();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        fee_structure_id: editData.fee_structure_id || "",
        discount_name: editData.discount_name || "",
        discount_type: editData.discount_type || "PERCENTAGE",
        discount_value: editData.discount_value || "",
        start_date: editData.start_date?.split("T")[0] || "",
        end_date: editData.end_date?.split("T")[0] || "",
        status: editData.status || "ACTIVE",
      });
    }
  }, [editData]);

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
        await updateFeeDiscount(editData.id, formData);
      } else {
        await createFeeDiscount(formData);
      }

      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editData ? "Update Fee Discount" : "Add Fee Discount"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
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
            <option value="">Select</option>

            {feeStructures.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} - ₹{item.total_amount}
              </option>
            ))}
          </select>
        </div>

        {/* Discount Name */}

        <div>
          <label className="block mb-2 font-medium">
            Discount Name
          </label>

          <input
            type="text"
            name="discount_name"
            value={formData.discount_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Discount Type */}

        <div>
          <label className="block mb-2 font-medium">
            Discount Type
          </label>

          <select
            name="discount_type"
            value={formData.discount_type}
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

        {/* Discount Value */}

        <div>
          <label className="block mb-2 font-medium">
            Discount Value
          </label>

          <input
            type="number"
            name="discount_value"
            value={formData.discount_value}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Start Date */}

        <div>
          <label className="block mb-2 font-medium">
            Start Date
          </label>

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* End Date */}

        <div>
          <label className="block mb-2 font-medium">
            End Date
          </label>

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
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

        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
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
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
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
}

export default AddFeeDiscount;