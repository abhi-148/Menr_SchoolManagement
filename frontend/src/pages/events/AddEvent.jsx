import { useEffect, useState } from "react";

import {
  createEvent,
  updateEvent,
} from "../../services/eventService";

import { getSchools } from "../../services/schoolService";
import { getAcademicYears } from "../../services/academicYearService";
import { getBranches } from "../../services/branchService";
import { getClasses } from "../../services/classService";

const AddEvent = ({
  editData,
  onSuccess,
  onCancel,
}) => {

  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [schools, setSchools] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({

    school_id: "",

    academic_year_id: "",

    school_branch_id: "",

    school_class_id: "",

    event_name: "",

    event_description: "",

    event_type: "",

    audience: "ALL",

    venue: "",

    organizers: "",

    event_schedule: [
  {
    title: "",
    date: "",
    start_time: "",
    end_time: "",
    venue: "",
  },
],

    start_date: "",

    end_date: "",

    start_time: "",

    end_time: "",

    registration_required: 0,

    registration_deadline: "",

    budget: "",

    max_participants: "",

    priority: "MEDIUM",

    is_holiday: 0,

   event_status: "DRAFT",
status: "ACTIVE",
cover_image: null,
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {

    try {

      const [

        schoolsRes,

        yearsRes,

        branchesRes,

        classesRes,

      ] = await Promise.all([

        getSchools(),

        getAcademicYears(),

        getBranches(),

        getClasses(),

      ]);

      setSchools(schoolsRes.data || schoolsRes);

      setAcademicYears(
        yearsRes.data || yearsRes
      );

      setBranches(
        branchesRes.data || branchesRes
      );

      setClasses(
        classesRes.data || classesRes
      );

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    if (!editData) return;

    setFormData({

      school_id:
        editData.school_id || "",

      academic_year_id:
        editData.academic_year_id || "",

      school_branch_id:
        editData.school_branch_id || "",

      school_class_id:
        editData.school_class_id || "",

      event_name:
        editData.event_name || "",

      event_description:
        editData.event_description || "",

      event_type:
        editData.event_type || "",

      audience:
        editData.audience || "ALL",

      venue:
        editData.venue || "",

      organizers:
        editData.organizers || "",

        event_schedule:
  editData.event_schedule &&
  editData.event_schedule.length > 0
    ? editData.event_schedule
    : [
        {
          title: "",
          date: "",
          start_time: "",
          end_time: "",
          venue: "",
        },
      ],


      start_date:
        editData.start_date?.split("T")[0] || "",

      end_date:
        editData.end_date?.split("T")[0] || "",

      start_time:
        editData.start_time || "",

      end_time:
        editData.end_time || "",

      registration_required:
        editData.registration_required || 0,

      registration_deadline:
        editData.registration_deadline?.split("T")[0] || "",

      budget:
        editData.budget || "",

      max_participants:
        editData.max_participants || "",

      priority:
        editData.priority || "MEDIUM",

      is_holiday:
        editData.is_holiday || 0,

      event_status:
  editData.event_status || "DRAFT",

status:
  editData.status || "ACTIVE",
  cover_image: editData.cover_image || null,

    });

  }, [editData]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  const handleImageChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setFormData((prev) => ({
    ...prev,
    cover_image: file,
  }));

  setPreview(URL.createObjectURL(file));

};

  const handleScheduleChange = (
  index,
  field,
  value
) => {

  const updated = [...formData.event_schedule];

  updated[index][field] = value;

  setFormData({
    ...formData,
    event_schedule: updated,
  });

};

const addSchedule = () => {

  setFormData({

    ...formData,

    event_schedule: [

      ...formData.event_schedule,

      {

        title: "",

        date: "",

        start_time: "",

        end_time: "",

        venue: "",

      },

    ],

  });

};

const removeSchedule = (index) => {

  const updated = [...formData.event_schedule];

  updated.splice(index, 1);

  setFormData({

    ...formData,

    event_schedule: updated,

  });

};

  const handleSubmit = async (e) => {
    console.log("Submitting Form:", formData);
    console.log("Branches Array:", branches);
console.log(
  "Selected Branch:",
  formData.school_branch_id
);

    e.preventDefault();

    try {

      setLoading(true);

     const data = new FormData();

Object.keys(formData).forEach((key) => {

  if (key === "event_schedule") {
    data.append(
      "event_schedule",
      JSON.stringify(formData.event_schedule)
    );
  }

  else if (key === "cover_image") {

    if (formData.cover_image) {
      data.append(
        "cover_image",
        formData.cover_image
      );
    }

  }

  else {

    data.append(key, formData[key]);

  }

});

if (editData) {

  await updateEvent(
    editData.event_id,
    data
  );

} else {

  await createEvent(data);

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
        {editData ? "Update Event" : "Create Event"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* ===========================
            Basic Information
        =========================== */}

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold border-b pb-2">
            Basic Information
          </h3>
        </div>

        {/* School */}

        {role === "SUPER_ADMIN" && (

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

        )}

        {/* Academic Year */}

        <div>

          <label className="block mb-2 font-medium">
            Academic Year
          </label>

          <select
            name="academic_year_id"
            value={formData.academic_year_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Academic Year
            </option>

           {academicYears.map((year) => (

  <option
    key={year.id}
    value={year.id}
  >
    {year.academic_year_name}
  </option>

))}

          </select>

        </div>

        {/* Branch */}

        <div>

          <label className="block mb-2 font-medium">
            Branch
          </label>

          <select
            name="school_branch_id"
            value={formData.school_branch_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Branch
            </option>

           {branches.map((branch) => (

  <option
    key={branch.branch_id}
    value={branch.branch_id}
  >
    {branch.branch_name}
  </option>

))}

          </select>

        </div>

        {/* Class */}

        <div>

          <label className="block mb-2 font-medium">
            Class
          </label>

          <select
            name="school_class_id"
            value={formData.school_class_id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Class
            </option>

            {classes.map((cls) => (

  <option
    key={cls.id}
    value={cls.id}
  >
    {cls.class_name}
  </option>

))}

          </select>

        </div>

        {/* Event Name */}

        <div>

          <label className="block mb-2 font-medium">
            Event Name
          </label>

          <input
            type="text"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
            placeholder="Annual Sports Day"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Event Type */}

        <div>

          <label className="block mb-2 font-medium">
            Event Type
          </label>

          <select
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Event Type
            </option>

            <option value="SPORTS">
              SPORTS
            </option>

            <option value="CULTURAL">
              CULTURAL
            </option>

            <option value="ACADEMIC">
              ACADEMIC
            </option>

            <option value="SEMINAR">
              SEMINAR
            </option>

            <option value="WORKSHOP">
              WORKSHOP
            </option>

            <option value="CELEBRATION">
              CELEBRATION
            </option>

            <option value="OTHER">
              OTHER
            </option>

          </select>

        </div>

        {/* Audience */}

        <div>

          <label className="block mb-2 font-medium">
            Audience
          </label>

          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="ALL">ALL</option>
            <option value="STUDENTS">STUDENTS</option>
            <option value="STAFF">STAFF</option>
            <option value="PARENTS">PARENTS</option>

          </select>

        </div>

        {/* ===========================
            Event Schedule
        =========================== */}

       

        <div className="md:col-span-2">

  <div className="flex justify-between items-center mb-4">

    <h3 className="text-lg font-semibold">
      Event Schedule
    </h3>

    <button
      type="button"
      onClick={addSchedule}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      + Add Schedule
    </button>

  </div>

  {formData.event_schedule.map((item, index) => (

    <div
      key={index}
      className="border rounded-lg p-4 mb-4"
    >

      <div className="grid grid-cols-5 gap-4">

        <input
          type="text"
          placeholder="Title"
          value={item.title}
          onChange={(e)=>
            handleScheduleChange(
              index,
              "title",
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

        <input
          type="date"
          value={item.date}
          onChange={(e)=>
            handleScheduleChange(
              index,
              "date",
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

        <input
          type="time"
          value={item.start_time}
          onChange={(e)=>
            handleScheduleChange(
              index,
              "start_time",
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

        <input
          type="time"
          value={item.end_time}
          onChange={(e)=>
            handleScheduleChange(
              index,
              "end_time",
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Venue"
          value={item.venue}
          onChange={(e)=>
            handleScheduleChange(
              index,
              "venue",
              e.target.value
            )
          }
          className="border rounded-lg p-3"
        />

      </div>

      {formData.event_schedule.length > 1 && (

        <button
          type="button"
          onClick={() =>
            removeSchedule(index)
          }
          className="bg-red-600 text-white px-3 py-2 rounded mt-3"
        >
          Remove
        </button>

      )}

    </div>

  ))}

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
    required
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
    required
    className="w-full border rounded-lg p-3"
  />

</div>

{/* Start Time */}

<div>

  <label className="block mb-2 font-medium">
    Start Time
  </label>

  <input
    type="time"
    name="start_time"
    value={formData.start_time}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  />

</div>

{/* End Time */}

<div>

  <label className="block mb-2 font-medium">
    End Time
  </label>

  <input
    type="time"
    name="end_time"
    value={formData.end_time}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  />

</div>
          
        {/* Organizers */}

        <div>

          <label className="block mb-2 font-medium">
            Organizers
          </label>

          <input
            type="text"
            name="organizers"
            value={formData.organizers}
            onChange={handleChange}
            placeholder="Principal, Sports Department"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Registration Required */}

        <div>

          <label className="block mb-2 font-medium">
            Registration Required
          </label>

          <select
            name="registration_required"
            value={formData.registration_required}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value={0}>No</option>

            <option value={1}>Yes</option>

          </select>

        </div>

        {/* Registration Deadline */}

        <div>

          <label className="block mb-2 font-medium">
            Registration Deadline
          </label>

          <input
            type="date"
            name="registration_deadline"
            value={formData.registration_deadline}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Budget */}

        <div>

          <label className="block mb-2 font-medium">
            Budget
          </label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="50000"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Max Participants */}

        <div>

          <label className="block mb-2 font-medium">
            Max Participants
          </label>

          <input
            type="number"
            name="max_participants"
            value={formData.max_participants}
            onChange={handleChange}
            placeholder="500"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* ===========================
            Additional Details
        =========================== */}

        <div className="md:col-span-2 mt-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Additional Details
          </h3>
        </div>

        {/* Event Cover Image */}

<div className="md:col-span-2">

  <label className="block mb-2 font-medium">
    Event Cover Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full border rounded-lg p-3"
  />

  {(preview || formData.cover_image) && (

    <img
      src={
        preview
          ? preview
          : `http://localhost:5000/uploads/${formData.cover_image}`
      }
      alt="Cover"
      className="mt-4 h-48 rounded-lg border object-cover"
    />

  )}

</div>


                {/* Event Description */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Event Description
          </label>

          <textarea
            rows="4"
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            placeholder="Enter complete event description..."
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Priority */}

        <div>

          <label className="block mb-2 font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="URGENT">URGENT</option>
          </select>

        </div>

        {/* Holiday */}

        <div>

          <label className="block mb-2 font-medium">
            Is Holiday
          </label>

          <select
            name="is_holiday"
            value={formData.is_holiday}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>

        </div>

        {/* Status */}

        <div>

         <label className="block mb-2 font-medium">
    Event Status
</label>

<select
    name="event_status"
    value={formData.event_status}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
>
    <option value="DRAFT">DRAFT</option>
    <option value="PUBLISHED">PUBLISHED</option>
    <option value="COMPLETED">COMPLETED</option>
    <option value="CANCELLED">CANCELLED</option>
</select>

<div>

<label className="block mb-2 font-medium">
Record Status
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

        </div>

        {/* Empty Grid */}

        <div></div>

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
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400 transition"
          >
            {loading
              ? "Saving..."
              : editData
              ? "Update Event"
              : "Save Event"}
          </button>

        </div>

      </form>

    </div>

  );

};

export default AddEvent;