import { useEffect, useState } from "react";

function AddStaffAttendance({
  onAdd,
  editingAttendance,
  cancelEdit
}) {

  const [formData, setFormData] = useState({
    staff_id: "",
    date: "",
    clock_in: "",
    clock_out: "",
    status: "PRESENT"
  });


  useEffect(() => {

    if (editingAttendance) {

      setFormData({
        staff_id:
          editingAttendance.staff_id || "",

        date:
          editingAttendance.date
            ? String(
                editingAttendance.date
              ).split("T")[0]
            : "",

        clock_in:
          editingAttendance.clock_in || "",

        clock_out:
          editingAttendance.clock_out || "",

        status:
          editingAttendance.status ||
          "PRESENT"
      });

    }

  }, [editingAttendance]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd({
      ...formData,

      staff_id:
        Number(formData.staff_id)
    });


    if (!editingAttendance) {

      setFormData({
        staff_id: "",
        date: "",
        clock_in: "",
        clock_out: "",
        status: "PRESENT"
      });

    }

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-5">

        {editingAttendance
          ? "Update Staff Attendance"
          : "Mark Staff Attendance"}

      </h2>


      <div className="grid md:grid-cols-2 gap-4">


        {/* Staff ID */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Staff ID
          </label>

          <input
            type="number"
            name="staff_id"
            placeholder="Enter Staff ID"
            value={formData.staff_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            min="1"
            required
          />

        </div>


        {/* Date */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Attendance Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        {/* Clock In */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Clock In
          </label>

          <input
            type="time"
            name="clock_in"
            value={formData.clock_in}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

        </div>


        {/* Clock Out */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Clock Out
          </label>

          <input
            type="time"
            name="clock_out"
            value={formData.clock_out}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

        </div>


        {/* Status */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Attendance Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="PRESENT">
              PRESENT
            </option>

            <option value="ABSENT">
              ABSENT
            </option>

            <option value="LATE">
              LATE
            </option>

            <option value="LEAVE">
              LEAVE
            </option>

            <option value="HALF_DAY">
              HALF DAY
            </option>

          </select>

        </div>

      </div>


      <div className="flex gap-3 mt-6">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          {editingAttendance
            ? "Update Attendance"
            : "Save Attendance"}

        </button>


        {editingAttendance && (

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

export default AddStaffAttendance;