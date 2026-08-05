import { useEffect, useMemo, useState } from "react";

import AddEvent from "./AddEvent";

import {
  getEvents,
  deleteEvent,
} from "../../services/eventService";

const Events = () => {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {

    try {

      setLoading(true);

      const res = await getEvents();

      setEvents(res.data || res);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this event?"
      )
    )
      return;

    try {

      await deleteEvent(id);

      loadEvents();

    } catch (err) {

      alert(
        err.response?.data?.message ||
          "Delete failed."
      );

    }

  };

  const filteredEvents = useMemo(() => {

    return events.filter((event) => {

      const keyword =
        search.toLowerCase();

      const matchSearch =

        event.event_name
          ?.toLowerCase()
          .includes(keyword) ||

        event.event_type
          ?.toLowerCase()
          .includes(keyword) ||

        event.venue
          ?.toLowerCase()
          .includes(keyword) ||

        event.organizers
          ?.toLowerCase()
          .includes(keyword) ||

        event.branch_name
          ?.toLowerCase()
          .includes(keyword);

      const matchStatus =

        statusFilter === "" ||

        event.status === statusFilter;

      const matchType =

        typeFilter === "" ||

        event.event_type === typeFilter;

      return (
        matchSearch &&
        matchStatus &&
        matchType
      );

    });

  }, [
    events,
    search,
    statusFilter,
    typeFilter,
  ]);

    return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Event Management
          </h1>

          <p className="text-gray-500 mt-1">
            Total Events : {filteredEvents.length}
          </p>

        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Event
        </button>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}

          <input
            type="text"
            placeholder="Search Event, Venue, Branch..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3"
          />

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg p-3"
          >

            <option value="">
              All Status
            </option>

            <option value="DRAFT">
              Draft
            </option>

            <option value="UPCOMING">
              Upcoming
            </option>

            <option value="ONGOING">
              Ongoing
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </select>

          {/* Event Type */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="border rounded-lg p-3"
          >

            <option value="">
              All Event Types
            </option>

            <option value="SPORTS">
              Sports
            </option>

            <option value="CULTURAL">
              Cultural
            </option>

            <option value="ACADEMIC">
              Academic
            </option>

            <option value="SEMINAR">
              Seminar
            </option>

            <option value="WORKSHOP">
              Workshop
            </option>

            <option value="CELEBRATION">
              Celebration
            </option>

            <option value="OTHER">
              Other
            </option>

          </select>

        </div>

      </div>

      {/* Add / Edit Form */}

      {showForm && (

        <div className="mb-6">

          <AddEvent
            editData={editData}
            onCancel={() => {
              setShowForm(false);
              setEditData(null);
            }}
            onSuccess={() => {
              setShowForm(false);
              setEditData(null);
              loadEvents();
            }}
          />

        </div>

      )}

      {/* Table */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">#</th>

              <th className="p-3 text-left">
                Event
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Branch
              </th>

              <th className="p-3 text-left">
                Class
              </th>

              <th className="p-3 text-left">
                Start Date
              </th>

              <th className="p-3 text-left">
                Venue
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {loading ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center p-8"
                >
                  Loading Events...
                </td>

              </tr>

            ) : filteredEvents.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center p-8 text-gray-500"
                >
                  No Events Found
                </td>

              </tr>

            ) : (

              filteredEvents.map((item, index) => (

                <tr
                  key={item.event_id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3">

                    <div className="font-semibold">
                      {item.event_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {item.audience}
                    </div>

                  </td>

                  <td className="p-3">
                    {item.event_type}
                  </td>

                  <td className="p-3">
                    {item.branch_name || "-"}
                  </td>

                  <td className="p-3">
                    {item.class_name || "-"}
                  </td>

                  <td className="p-3">
                    {item.start_date
                      ?.split("T")[0]}
                  </td>

                  <td className="p-3">
                    {item.venue || "-"}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold

                      ${
                        item.status === "UPCOMING"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "ONGOING"
                          ? "bg-green-100 text-green-700"
                          : item.status === "COMPLETED"
                          ? "bg-gray-200 text-gray-700"
                          : item.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>

                  <td className="p-3">

                    <div className="flex gap-2 justify-center">
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
                          handleDelete(item.event_id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Events;
             