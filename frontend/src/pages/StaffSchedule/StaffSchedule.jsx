import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AddStaffSchedule from "./AddStaffSchedule";

import {
  getStaffSchedules,
  createStaffSchedule,
  updateStaffSchedule,
  deleteStaffSchedule
} from "../../services/staffScheduleService";

function StaffSchedule() {

  const [schedules, setSchedules] = useState([]);

  const [editingSchedule, setEditingSchedule] =
    useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================================================
  // FETCH STAFF SCHEDULES
  // =========================================================

  useEffect(() => {
    fetchSchedules();
  }, []);


  const fetchSchedules = async () => {

    try {

      setLoading(true);

      const response =
        await getStaffSchedules();

      setSchedules(
        response.data || []
      );

    } catch (error) {

      console.error(
        "GET STAFF SCHEDULES ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleAddSchedule = async (data) => {

    try {

      if (editingSchedule) {

        await updateStaffSchedule(
          editingSchedule.schedule_id ||
          editingSchedule.id,
          data
        );

        alert(
          "Staff Schedule Updated Successfully"
        );

        setEditingSchedule(null);

      } else {

        await createStaffSchedule(data);

        alert(
          "Staff Schedule Added Successfully"
        );

      }

      fetchSchedules();

    } catch (error) {

      console.error(
        "SAVE STAFF SCHEDULE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (schedule) => {

    setEditingSchedule(schedule);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this Staff Schedule?"
      );

    if (!confirmDelete) return;


    try {

      await deleteStaffSchedule(id);

      alert(
        "Staff Schedule Deleted Successfully"
      );

      fetchSchedules();

    } catch (error) {

      console.error(
        "DELETE STAFF SCHEDULE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to delete schedule"
      );

    }

  };


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredSchedules =
    schedules.filter((item) => {

      const searchText =
        search.toLowerCase();

      return (

        String(
          item.staff_id || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.staff_name || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.subject_name || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.room || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.day_of_week || ""
        )
          .toLowerCase()
          .includes(searchText)

      );

    });


  // =========================================================
  // UI
  // =========================================================

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">


        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Staff Schedule
            </h1>

            <p className="text-gray-500">
              Manage Staff Teaching Schedules
            </p>

          </div>


          <button
            onClick={fetchSchedules}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>

        </div>


        {/* SUMMARY */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Total Schedules
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {schedules.length}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Active Schedules
            </h3>

            <h2 className="text-3xl font-bold mt-2">

              {
                schedules.filter(
                  (item) =>
                    item.status === "active"
                ).length
              }

            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Inactive Schedules
            </h3>

            <h2 className="text-3xl font-bold mt-2">

              {
                schedules.filter(
                  (item) =>
                    item.status === "inactive"
                ).length
              }

            </h2>

          </div>

        </div>


        {/* ADD / UPDATE FORM */}

        <AddStaffSchedule

          onAdd={handleAddSchedule}

          editingSchedule={
            editingSchedule
          }

          cancelEdit={() =>
            setEditingSchedule(null)
          }

        />


        {/* SEARCH */}

        <div className="bg-white p-4 rounded-xl shadow mb-4">

          <input

            type="text"

            placeholder="Search by Staff, Subject, Room or Day..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

          />

        </div>


        {/* TABLE */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Staff
                </th>

                <th className="p-4 text-left">
                  Period
                </th>

                <th className="p-4 text-left">
                  Class
                </th>

                <th className="p-4 text-left">
                  Batch
                </th>

                <th className="p-4 text-left">
                  Subject
                </th>

                <th className="p-4 text-left">
                  Day
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Room
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="11"
                    className="text-center p-6"
                  >
                    Loading Staff Schedules...
                  </td>

                </tr>

              ) : filteredSchedules.length === 0 ? (

                <tr>

                  <td
                    colSpan="11"
                    className="text-center p-6 text-gray-500"
                  >
                    No Staff Schedules Found
                  </td>

                </tr>

              ) : (

                filteredSchedules.map(
                  (item) => (

                    <tr
                      key={
                        item.schedule_id ||
                        item.id
                      }
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {
                          item.schedule_id ||
                          item.id
                        }
                      </td>


                      <td className="p-4 font-medium">

                        {
                          item.staff_name ||
                          `Staff #${item.staff_id}`
                        }

                      </td>


                      <td className="p-4">

                        {
                          item.period_number ||
                          `Period #${item.period_id}`
                        }

                      </td>


                      <td className="p-4">

                        {
                          item.class_name ||
                          `Class #${item.class_id}`
                        }

                      </td>


                      <td className="p-4">

                        {
                          item.batch_name ||
                          `Batch #${item.batch_id}`
                        }

                      </td>


                      <td className="p-4">

                        {
                          item.subject_name ||
                          `Subject #${item.subject_id}`
                        }

                      </td>


                      <td className="p-4">

                        {item.day_of_week}

                      </td>


                      <td className="p-4">

                        {item.duration} min

                      </td>


                      <td className="p-4">

                        {item.room}

                      </td>


                      <td className="p-4">

                        <span
                          className={
                            item.status ===
                            "active"

                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                              : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          }
                        >

                          {item.status}

                        </span>

                      </td>


                      <td className="p-4">

                        <div className="flex gap-2">

                          <button

                            onClick={() =>
                              handleEdit(item)
                            }

                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>


                          <button

                            onClick={() =>
                              handleDelete(
                                item.schedule_id ||
                                item.id
                              )
                            }

                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default StaffSchedule;