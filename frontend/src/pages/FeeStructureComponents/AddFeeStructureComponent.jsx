import { useEffect, useState } from "react";

function AddFeeStructureComponent({
  feeStructures = [],
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    fee_structure_id: "",
    component_name: "",
    amount: "",
    tax_percentage: 0,
    tax_amount: 0,
    final_amount: 0,
    status: "active"
  });

  useEffect(() => {

    if (editData) {

      setFormData({
        fee_structure_id: editData.fee_structure_id || "",
        component_name: editData.component_name || "",
        amount: editData.amount || "",
        tax_percentage: editData.tax_percentage || 0,
        tax_amount: editData.tax_amount || 0,
        final_amount: editData.final_amount || 0,
        status: editData.status || "active"
      });

    }

  }, [editData]);

  useEffect(() => {

    const amount = Number(formData.amount || 0);
    const tax = Number(formData.tax_percentage || 0);

    const taxAmount = (amount * tax) / 100;
    const finalAmount = amount + taxAmount;

    setFormData(prev => ({
      ...prev,
      tax_amount: taxAmount,
      final_amount: finalAmount
    }));

  }, [
    formData.amount,
    formData.tax_percentage
  ]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isEditing) {

      onUpdate(editData.id, formData);

    } else {

      onAdd(formData);

    }

    setFormData({
      fee_structure_id: "",
      component_name: "",
      amount: "",
      tax_percentage: 0,
      tax_amount: 0,
      final_amount: 0,
      status: "active"
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-4">

        {
          isEditing
            ? "Update Fee Component"
            : "Add Fee Component"
        }

      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <select
          name="fee_structure_id"
          value={formData.fee_structure_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >

          <option value="">
            Select Fee Structure
          </option>

          {
            feeStructures.map(item => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.school_name} | {item.batch_code}
              </option>

            ))
          }

        </select>

        <input
          type="text"
          name="component_name"
          placeholder="Component Name"
          value={formData.component_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="tax_percentage"
          placeholder="Tax %"
          value={formData.tax_percentage}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          value={formData.tax_amount}
          className="border p-3 rounded-lg bg-gray-100"
          readOnly
        />

        <input
          type="number"
          value={formData.final_amount}
          className="border p-3 rounded-lg bg-gray-100"
          readOnly
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>

      </div>

      <button
        type="submit"
        className={`mt-4 text-white px-6 py-3 rounded-lg ${
          isEditing
            ? "bg-blue-600"
            : "bg-green-600"
        }`}
      >

        {
          isEditing
            ? "Update"
            : "Save"
        }

      </button>

    </form>

  );

}

export default AddFeeStructureComponent;