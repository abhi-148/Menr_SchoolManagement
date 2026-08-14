import { useEffect, useState } from "react";

function AddStaffSchedule({
  onAdd,
  editingSchedule,
  cancelEdit
}) {

  const [formData, setFormData] = useState({
    staff_id: "",
    period_id: "",
    class_id: "",
    batch_id: "",
    subject_id: "",
    day_of_week: "Monday",
    duration: "",
    room: "",
    status: "active"
  });

  useEffect(() => {

    if (editingSchedule) {

      setFormData({
        staff_id: editingSchedule.staff_id || "",
        period_id: editingSchedule.period_id || "",
        class_id: editingSchedule.class_id || "",
        batch_id: editingSchedule.batch_id || "",
        subject_id: editingSchedule.subject_id || "",
        day_of_week:
          editingSchedule.day_of_week || "Monday",
        duration: editingSchedule.duration || "",
        room: editingSchedule.room || "",
        status: editingSchedule.status || "active"
      });

    }

  }, [editingSchedule]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd({
      ...formData,

      staff_id: Number(formData.staff_id),
      period_id: Number(formData.period_id),
      class_id: Number(formData.class_id),
      batch_id: Number(formData.batch_id),
      subject_id: Number(formData.subject_id),
      duration: Number(formData.duration)
    });

    if (!editingSchedule) {

      setFormData({
        staff_id: "",
        period_id: "",
        class_id: "",
        batch_id: "",
        subject_id: "",
        day_of_week: "Monday",
        duration: "",
        room: "",
        status: "active"
      });

    }

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-5">

        {editingSchedule
          ? "Update Staff Schedule"
          : "Add Staff Schedule"}

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
            required
            min="1"
          />

        </div>


        {/* Period ID */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Period ID
          </label>

          <input
            type="number"
            name="period_id"
            placeholder="Enter Period ID"
            value={formData.period_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            min="1"
          />

        </div>


        {/* Class ID */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Class ID
          </label>

          <input
            type="number"
            name="class_id"
            placeholder="Enter Class ID"
            value={formData.class_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            min="1"
          />

        </div>


        {/* Batch ID */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Batch ID
          </label>

          <input
            type="number"
            name="batch_id"
            placeholder="Enter Batch ID"
            value={formData.batch_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            min="1"
          />

        </div>


        {/* Subject ID */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Subject ID
          </label>

          <input
            type="number"
            name="subject_id"
            placeholder="Enter Subject ID"
            value={formData.subject_id}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            min="1"
          />

        </div>


        {/* Day */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Day of Week
          </label>

          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="Monday">
              Monday
            </option>

            <option value="Tuesday">
              Tuesday
            </option>

            <option value="Wednesday">
              Wednesday
            </option>

            <option value="Thursday">
              Thursday
            </option>

            <option value="Friday">
              Friday
            </option>

            <option value="Saturday">
              Saturday
            </option>

            <option value="Sunday">
              Sunday
            </option>

          </select>

        </div>


        {/* Duration */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Duration (Minutes)
          </label>

          <input
            type="number"
            name="duration"
            placeholder="Example: 45"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
            min="1"
          />

        </div>


        {/* Room */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Room
          </label>

          <input
            type="text"
            name="room"
            placeholder="Example: Room 101"
            value={formData.room}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>


        {/* Status */}

        <div>

          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>


      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          {editingSchedule
            ? "Update Schedule"
            : "Save Schedule"}

        </button>


        {editingSchedule && (

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

export default AddStaffSchedule;