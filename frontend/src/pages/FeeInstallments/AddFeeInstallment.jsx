import { useEffect, useState } from "react";
import {
  createFeeInstallment,
  updateFeeInstallment,
} from "../../services/feeInstallmentService";

import { getFeeStructures } from "../../services/feeStructureService";

const AddFeeInstallment = ({
  editData,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const [feeStructures, setFeeStructures] = useState([]);

  const [formData, setFormData] = useState({
    fee_structure_id: "",
    installment_no: "",
    installment_name: "",
    amount: "",
    due_date: "",
    late_fee: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadFeeStructures();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        fee_structure_id: editData.fee_structure_id || "",
        installment_no: editData.installment_no || "",
        installment_name: editData.installment_name || "",
        amount: editData.amount || "",
        due_date: editData.due_date
          ? editData.due_date.substring(0, 10)
          : "",
        late_fee: editData.late_fee || "",
        status: editData.status || "ACTIVE",
      });
    }
  }, [editData]);

  const loadFeeStructures = async () => {
    try {
      const res = await getFeeStructures();
      setFeeStructures(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editData) {
        await updateFeeInstallment(editData.id, formData);
      } else {
        await createFeeInstallment(formData);
      }

      onSuccess();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 mb-6">

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">

        {editData
          ? "Update Fee Installment"
          : "Add Fee Installment"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Fee Structure */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Fee Structure

          </label>

          <select
            name="fee_structure_id"
            value={formData.fee_structure_id}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            <option value="">
              Select Fee Structure
            </option>

            {feeStructures.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.school_name} | {item.batch_code} | ₹
                {item.total_amount}
              </option>

            ))}

          </select>

        </div>

        {/* Installment No */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Installment No.

          </label>

          <input
            type="number"
            name="installment_no"
            value={formData.installment_no}
            onChange={handleChange}
            required
            placeholder="1"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Installment Name */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Installment Name

          </label>

          <input
            type="text"
            name="installment_name"
            value={formData.installment_name}
            onChange={handleChange}
            required
            placeholder="First Installment"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Amount */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Amount

          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="5000"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

                {/* Due Date */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Due Date

          </label>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Late Fee */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Late Fee

          </label>

          <input
            type="number"
            name="late_fee"
            value={formData.late_fee}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">

            Status

          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>

          </select>

        </div>

        {/* Buttons */}

        <div className="md:col-span-2 flex justify-end gap-4 mt-4">

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : editData
              ? "Update Installment"
              : "Save Installment"}
          </button>

        </div>

      </form>

    </div>
  );

};

export default AddFeeInstallment;