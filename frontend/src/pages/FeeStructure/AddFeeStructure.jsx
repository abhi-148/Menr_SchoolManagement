import { useState, useEffect } from "react";

function AddFeeStructure({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {
const [formData, setFormData] = useState({
  school_id: "",
  batch_id: "",
  academic_year_id: "",
  total_amount: "",
  due_date: "",
  payment_type: "FULL",
  number_of_installments: "",
  status: "active"
});

useEffect(() => {

  if (editData) {

    setFormData({
      school_id: editData.school_id || "",
      batch_id: editData.batch_id || "",
      academic_year_id: editData.academic_year_id || "",
      total_amount: editData.total_amount || "",
      due_date: editData.due_date || "",
      payment_type: editData.payment_type || "FULL",
      number_of_installments:
        editData.number_of_installments || "",
      status: editData.status || "active"
    });

  }

}, [editData]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isEditing) {

      onUpdate(
        editData.id,
        formData
      );

    } else {

      onAdd(formData);

    }

    setFormData({
  school_id: "",
  batch_id: "",
  academic_year_id: "",
  total_amount: "",
  due_date: "",
  payment_type: "FULL",
  number_of_installments: "",
  status: "active"
});

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">
        {
          isEditing
            ? "Update Fee Structure"
            : "Add Fee Structure"
        }
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

  <input
    type="number"
    name="school_id"
    placeholder="School ID"
    value={formData.school_id}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <input
    type="number"
    name="batch_id"
    placeholder="Batch ID"
    value={formData.batch_id}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <input
    type="number"
    name="academic_year_id"
    placeholder="Academic Year ID"
    value={formData.academic_year_id}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <input
    type="number"
    name="total_amount"
    placeholder="Total Amount"
    value={formData.total_amount}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <input
    type="date"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <select
    name="payment_type"
    value={formData.payment_type}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  >
    <option value="FULL">Full</option>
    <option value="SEMESTER">Semester</option>
    <option value="INSTALLMENT">Installment</option>
  </select>

  <input
    type="number"
    name="number_of_installments"
    placeholder="No. of Installments"
    value={formData.number_of_installments}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  />

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="border p-3 rounded-lg"
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
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

export default AddFeeStructure;