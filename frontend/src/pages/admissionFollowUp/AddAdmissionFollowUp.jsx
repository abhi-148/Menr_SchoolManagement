import { useEffect, useState } from "react";

function AddAdmissionFollowUp({

  onAdd,

  editingFollowUp,

  cancelEdit

}) {

  const initialState = {

    inquiry_id: "",

    follow_up_date: "",

    next_follow_up_date: "",

    response_status: "",

    notes: "",

    followed_up_by_staff_id: ""

  };

  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {

    if (editingFollowUp) {

      setFormData({

        ...initialState,

        ...editingFollowUp

      });

    } else {

      setFormData(initialState);

    }

  }, [editingFollowUp]);

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

    onAdd(formData);

    if (!editingFollowUp) {

      setFormData(initialState);

    }

  };

  return (

    <div className="bg-white shadow rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-semibold mb-6">

        {

          editingFollowUp

            ? "Update Admission Follow Up"

            : "Add Admission Follow Up"

        }

      </h2>

      <form

        onSubmit={handleSubmit}

        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"

      >
                <div>
          <label className="block mb-1 font-medium">
            Inquiry ID
          </label>

          <input
            type="number"
            name="inquiry_id"
            value={formData.inquiry_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Follow Up Date
          </label>

          <input
            type="date"
            name="follow_up_date"
            value={formData.follow_up_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Next Follow Up Date
          </label>

          <input
            type="date"
            name="next_follow_up_date"
            value={formData.next_follow_up_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Response Status
          </label>

          <select
            name="response_status"
            value={formData.response_status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">
              Select Response Status
            </option>

            <option value="Interested">
  Interested
</option>

<option value="Not Interested">
  Not Interested
</option>

<option value="Call Back">
  Call Back
</option>

<option value="No Response">
  No Response
</option>

<option value="Admission Confirmed">
  Admission Confirmed
</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-2"
            placeholder="Enter follow up notes..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Followed Up By Staff ID
          </label>

          <input
            type="number"
            name="followed_up_by_staff_id"
            value={formData.followed_up_by_staff_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

                <div className="md:col-span-3 flex gap-3 mt-4">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {editingFollowUp
              ? "Update Follow Up"
              : "Save Follow Up"}
          </button>

          {editingFollowUp && (

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

export default AddAdmissionFollowUp;
   