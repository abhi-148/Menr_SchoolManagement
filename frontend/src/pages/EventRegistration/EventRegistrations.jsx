import { useEffect, useState } from "react";

import {

  getEventRegistrations,

  deleteEventRegistration,

} from "../../services/eventRegistrationService";

import AddEventRegistration from "./AddEventRegistration";

const EventRegistrations = () => {

  const [registrations, setRegistrations] =
    useState([]);

  const [
    filteredRegistrations,
    setFilteredRegistrations,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

  useEffect(() => {

    loadRegistrations();

  }, []);

  useEffect(() => {

    const keyword =
      search.toLowerCase();

    setFilteredRegistrations(

      registrations.filter((item) =>

        item.event_name
          ?.toLowerCase()
          .includes(keyword) ||

        item.participant_type
          ?.toLowerCase()
          .includes(keyword) ||

        item.registration_status
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, registrations]);

  const loadRegistrations =
    async () => {

      try {

        setLoading(true);

        const res =
          await getEventRegistrations();

        const data =
          res.data || [];

        setRegistrations(data);

        setFilteredRegistrations(data);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete this registration?"
        )
      )
        return;

      try {

        await deleteEventRegistration(
          id
        );

        loadRegistrations();

      }

      catch (err) {

        alert(

          err.response?.data?.message ||

          "Delete failed."

        );

      }

    };

      return (

    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Event Registrations
          </h1>

          <p className="text-gray-500">
            Total Registrations : {filteredRegistrations.length}
          </p>

        </div>

        <button
          onClick={() => {

            setEditData(null);

            setShowForm(true);

          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Registration
        </button>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search Registration..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border rounded-lg px-4 py-3"
        />

      </div>

      {/* Add / Edit Form */}

      {showForm && (

        <div className="mb-8">

          <AddEventRegistration

            editData={editData}

            onCancel={() => {

              setShowForm(false);

              setEditData(null);

            }}

            onSuccess={() => {

              setShowForm(false);

              setEditData(null);

              loadRegistrations();

            }}

          />

        </div>

      )}

      {/* Table */}

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg">

        <table className="min-w-full">

          <thead className="bg-gray-100 dark:bg-slate-700">

            <tr>

              <th className="px-4 py-3 text-left">
                #
              </th>

              <th className="px-4 py-3 text-left">
                Event
              </th>

              <th className="px-4 py-3 text-left">
                Participant
              </th>

              <th className="px-4 py-3 text-left">
                Registration Date
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

                        {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredRegistrations.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8"
                >
                  No Event Registrations Found.
                </td>

              </tr>

            ) : (

              filteredRegistrations.map(
                (item, index) => (

                  <tr
                    key={item.registration_id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-slate-700"
                  >

                    <td className="px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      {item.event_name}
                    </td>

                    <td className="px-4 py-3">
                      {item.participant_type}
                    </td>

                    <td className="px-4 py-3">
                      {item.registration_date
                        ? new Date(
                            item.registration_date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          item.registration_status === "REGISTERED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.registration_status}
                      </span>

                    </td>

                    <td className="px-4 py-3 flex gap-2 justify-center">

                      <button
                        onClick={() => {

                          setEditData(item);

                          setShowForm(true);

                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.registration_id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )

              )

            )}

                      </tbody>

        </table>

      </div>

    </div>

  );

};

export default EventRegistrations;

            
        