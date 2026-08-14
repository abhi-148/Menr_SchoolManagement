import { useEffect, useState } from "react";

function AddLeaveRequest({
  onAdd,
  editingLeave,
  cancelEdit
}) {

  const [formData, setFormData] = useState({
    leave_type: "Sick",
    start_date: "",
    end_date: "",
    reason: ""
  });

  useEffect(() => {

    if (editingLeave) {

      setFormData({
        leave_type:
          editingLeave.leave_type || "Sick",

        start_date:
          editingLeave.start_date
            ? String(
                editingLeave.start_date
              ).split("T")[0]
            : "",

        end_date:
          editingLeave.end_date
            ? String(
                editingLeave.end_date
              ).split("T")[0]
            : "",

        reason:
          editingLeave.reason || ""
      });

    }

  }, [editingLeave]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd(formData);

    if (!editingLeave) {

      setFormData({
        leave_type: "Sick",
        start_date: "",
        end_date: "",
        reason: ""
      });

    }

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-5">

        {editingLeave
          ? "Update Leave Request"
          : "Create Leave Request"}

      </h2>


      <div className="grid md:grid-cols-2 gap-4">


        <div>

          <label className="block text-sm font-medium mb-1">
            Leave Type
          </label>

          <select
            name="leave_type"
            value={formData.leave_type}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="Sick">
              Sick
            </option>

            <option value="Casual">
              Casual
            </option>

            <option value="Annual">
              Annual
            </option>

            <option value="Emergency">
              Emergency
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        <div>

          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        <div>

          <label className="block text-sm font-medium mb-1">
            End Date
          </label>

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        <div>

          <label className="block text-sm font-medium mb-1">
            Reason
          </label>

          <input
            type="text"
            name="reason"
            placeholder="Enter leave reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

        </div>

      </div>


      <div className="flex gap-3 mt-6">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          {editingLeave
            ? "Update Leave"
            : "Submit Leave"}

        </button>


        {editingLeave && (

          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        )}

      </div>

    </form>

  );
}

export default AddLeaveRequest;