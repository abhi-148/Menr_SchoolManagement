import { useEffect, useState } from "react";

import {

  createEventRegistration,

  updateEventRegistration,

} from "../../services/eventRegistrationService";

import { getEvents } from "../../services/eventService";

import { getStudents } from "../../services/studentService";

import { getStaff } from "../../services/staffService";

const AddEventRegistration = ({

  editData,

  onSuccess,

  onCancel,

}) => {

  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);

  const [students, setStudents] = useState([]);

  const [staff, setStaff] = useState([]);

  const [formData, setFormData] = useState({

    event_id: "",

    school_id: "",

    participant_type: "STUDENT",

    student_id: "",

    staff_id: "",

    parent_id: "",

    registration_status: "REGISTERED",

    payment_id: "",

    remarks: "",

    status: "ACTIVE",

  });

  useEffect(() => {

    loadDropdowns();

  }, []);

  const loadDropdowns = async () => {

    try {

      const [

        eventsRes,

        studentsRes,

        staffRes,

      ] = await Promise.all([

        getEvents(),

        getStudents(),

        getStaff(),

      ]);
setEvents(eventsRes.data || []);
setStudents(studentsRes.data || []);
setStaff(staffRes.data || []);

if (eventsRes.data && eventsRes.data.length > 0) {
  setFormData((prev) => ({
    ...prev,
    school_id: eventsRes.data[0].school_id,
  }));
}

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    if (!editData) return;

    setFormData({

      event_id:
        editData.event_id || "",

      school_id:
        editData.school_id || "",

      participant_type:
        editData.participant_type || "STUDENT",

      student_id:
        editData.student_id || "",

      staff_id:
        editData.staff_id || "",

      parent_id:
        editData.parent_id || "",

      registration_status:
        editData.registration_status || "REGISTERED",

      payment_id:
        editData.payment_id || "",

      remarks:
        editData.remarks || "",

      status:
        editData.status || "ACTIVE",

    });

  }, [editData]);

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (editData) {

        await updateEventRegistration(
          editData.registration_id,
          formData
        );

      }

     else {

  console.log("Form Data =>", formData);

 const payload = {
  ...formData,

  student_id:
    formData.participant_type === "STUDENT"
      ? Number(formData.student_id)
      : null,

  staff_id:
    formData.participant_type === "STAFF"
      ? Number(formData.staff_id)
      : null,

  parent_id:
    formData.participant_type === "PARENT"
      ? Number(formData.parent_id)
      : null,
};

console.log(payload);

await createEventRegistration(payload);

}

      onSuccess();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Something went wrong."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        {editData
          ? "Update Event Registration"
          : "Add Event Registration"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Event */}

        <div>

          <label className="block mb-2 font-medium">

            Event

          </label>

          <select
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">

              Select Event

            </option>

            {events.map((event) => (

             <option
  key={event.event_id}
  value={event.event_id}
>
  {event.event_name}
</option>

            ))}

          </select>

        </div>

        {/* Participant Type */}

        <div>

          <label className="block mb-2 font-medium">

            Participant Type

          </label>

          <select
            name="participant_type"
            value={formData.participant_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="STUDENT">

              STUDENT

            </option>

            <option value="STAFF">

              STAFF

            </option>

            <option value="PARENT">

              PARENT

            </option>

          </select>

        </div>

                {/* Student */}

        {formData.participant_type ===
          "STUDENT" && (

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
    {student.full_name}
  </option>
))}
            </select>

          </div>

        )}

        {/* Staff */}

        {formData.participant_type ===
          "STAFF" && (

          <div>

            <label className="block mb-2 font-medium">
              Staff
            </label>

            <select
              name="staff_id"
              value={formData.staff_id}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >

              <option value="">
                Select Staff
              </option>
{staff.map((member) => (
  <option
    key={member.id}
    value={member.id}
  >
    {member.full_name}
  </option>
))}

            </select>

          </div>

        )}

        {/* Parent */}

        {formData.participant_type ===
          "PARENT" && (

          <div>

            <label className="block mb-2 font-medium">
              Parent ID
            </label>

            <input
              type="number"
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              required
              placeholder="Enter Parent ID"
              className="w-full border rounded-lg p-3"
            />

          </div>

        )}

        {/* Registration Status */}

        <div>

          <label className="block mb-2 font-medium">
            Registration Status
          </label>

          <select
            name="registration_status"
            value={formData.registration_status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="REGISTERED">
              REGISTERED
            </option>

            <option value="CANCELLED">
              CANCELLED
            </option>

          </select>

        </div>

        {/* Payment ID */}

        <div>

          <label className="block mb-2 font-medium">
            Payment ID
          </label>

          <input
            type="number"
            name="payment_id"
            value={formData.payment_id}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full border rounded-lg p-3"
          />

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
            placeholder="Enter remarks..."
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

        {/* Empty Grid */}

        <div></div>

        {/* Buttons */}

        <div className="md:col-span-2 flex justify-end gap-3 mt-6">

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
          >

            Cancel

          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400"
          >

            {loading
              ? "Saving..."
              : editData
              ? "Update Registration"
              : "Save Registration"}

          </button>

        </div>

      </form>

    </div>

  );

};

export default AddEventRegistration;