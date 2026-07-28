import { useEffect, useState } from "react";

function AddAchievement({

  onAdd,

  editingAchievement,

  cancelEdit

}) {

  const initialState = {

    school_id: "",

    student_id: "",

    event_date: "",

    title: "",

    achievement_category: "",

    achievement_level: "",

    position_achieved: "",

    image_urls: "",

    certificate_url: "",

    status: "ACTIVE",

    approved_by: "",

    issued_by: ""

  };

  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {

    if (editingAchievement) {

      setFormData({

        ...initialState,

        ...editingAchievement

      });

    } else {

      setFormData(initialState);

    }

  }, [editingAchievement]);

  const handleChange = (e) => {

    const {

      name,

      value

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

  };

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Form Data:", formData);

  onAdd(formData);

  if (!editingAchievement) {
    setFormData(initialState);
  }
};

  return (

    <div className="bg-white shadow rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-semibold mb-6">

        {

          editingAchievement

            ? "Update Achievement"

            : "Add Achievement"

        }

      </h2>

      <form

        onSubmit={handleSubmit}

        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"

      >

                <div>
          <label className="block mb-1 font-medium">
            School ID
          </label>

          <input
            type="number"
            name="school_id"
            value={formData.school_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Student ID
          </label>

          <input
            type="number"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Event Date
          </label>

          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Achievement Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Achievement Category
          </label>

          <select
  name="achievement_category"
  value={formData.achievement_category}
  onChange={handleChange}
  className="w-full border rounded-lg p-2"
  required
>
  <option value="">Select Category</option>

  <option value="Academic">Academic</option>

  <option value="Sports">Sports</option>

  <option value="Cultural">Cultural</option>

  <option value="Technology">Technology</option>
</select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Achievement Level
          </label>

          <select
            name="achievement_level"
            value={formData.achievement_level}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">
              Select Level
            </option>

            <option value="School">
              School
            </option>

            <option value="District">
              District
            </option>

            <option value="State">
              State
            </option>

            <option value="National">
              National
            </option>

            <option value="International">
              International
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Position Achieved
          </label>

          <input
            type="text"
            name="position_achieved"
            value={formData.position_achieved}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="1st / Gold Medal"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Image URLs
          </label>

          <textarea
            name="image_urls"
            value={formData.image_urls}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2"
            placeholder="Image URLs"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Certificate URL
          </label>

          <input
            type="text"
            name="certificate_url"
            value={formData.certificate_url}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Approved By
          </label>

          <input
            type="number"
            name="approved_by"
            value={formData.approved_by}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Issued By
          </label>

          <input
            type="text"
            name="issued_by"
            value={formData.issued_by}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>
          </select>
        </div>

                <div className="md:col-span-3 flex gap-3 mt-4">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {editingAchievement
              ? "Update Achievement"
              : "Save Achievement"}
          </button>

          {editingAchievement && (

            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </div>

  );

}

export default AddAchievement;
     