import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AddStaffAttendance from "./AddStaffAttendance";

import {
  getStaffAttendance,
  createStaffAttendance,
  updateStaffAttendance,
  deleteStaffAttendance
} from "../../services/staffAttendanceService";


function StaffAttendance() {

  const [attendance, setAttendance] =
    useState([]);

  const [editingAttendance, setEditingAttendance] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // =========================================================
  // FETCH ATTENDANCE
  // =========================================================

  useEffect(() => {

    fetchAttendance();

  }, []);


  const fetchAttendance = async () => {

    try {

      setLoading(true);

      const response =
        await getStaffAttendance();

      setAttendance(
        response.data || []
      );

    } catch (error) {

      console.error(
        "GET STAFF ATTENDANCE ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleAddAttendance =
    async (data) => {

      try {

        if (editingAttendance) {

          await updateStaffAttendance(
            editingAttendance.attendance_id ||
            editingAttendance.id,
            data
          );

          alert(
            "Staff Attendance Updated Successfully"
          );

          setEditingAttendance(null);

        } else {

          await createStaffAttendance(
            data
          );

          alert(
            "Staff Attendance Created Successfully"
          );

        }

        fetchAttendance();

      } catch (error) {

        console.error(
          "SAVE ATTENDANCE ERROR:",
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

  const handleEdit =
    (item) => {

      setEditingAttendance(item);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this attendance record?"
        );

      if (!confirmDelete) return;


      try {

        await deleteStaffAttendance(id);

        alert(
          "Staff Attendance Deleted Successfully"
        );

        fetchAttendance();

      } catch (error) {

        console.error(
          "DELETE ATTENDANCE ERROR:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Unable to delete attendance"
        );

      }

    };


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredAttendance =
    attendance.filter((item) => {

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
          item.full_name || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.email || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.status || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          item.date || ""
        )
          .toLowerCase()
          .includes(searchText)

      );

    });


  // =========================================================
  // STATUS COUNTS
  // =========================================================

  const presentCount =
    attendance.filter(
      (item) =>
        item.status === "PRESENT"
    ).length;

  const absentCount =
    attendance.filter(
      (item) =>
        item.status === "ABSENT"
    ).length;

  const leaveCount =
    attendance.filter(
      (item) =>
        item.status === "LEAVE"
    ).length;


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
              Staff Attendance
            </h1>

            <p className="text-gray-500">
              Manage Staff Daily Attendance
            </p>

          </div>


          <button
            onClick={fetchAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>

        </div>


        {/* SUMMARY */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Total Records
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {attendance.length}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Present
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {presentCount}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Absent
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {absentCount}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Leave
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {leaveCount}
            </h2>

          </div>

        </div>


        {/* FORM */}

        <AddStaffAttendance

          onAdd={
            handleAddAttendance
          }

          editingAttendance={
            editingAttendance
          }

          cancelEdit={() =>
            setEditingAttendance(null)
          }

        />


        {/* SEARCH */}

        <div className="bg-white p-4 rounded-xl shadow mb-4">

          <input
            type="text"
            placeholder="Search by Staff, Email, Date or Status..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* TABLE */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Staff
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Clock In
                </th>

                <th className="p-4 text-left">
                  Clock Out
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
                    colSpan="8"
                    className="text-center p-6"
                  >
                    Loading Attendance...
                  </td>

                </tr>

              ) : filteredAttendance.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500"
                  >
                    No Attendance Records Found
                  </td>

                </tr>

              ) : (

                filteredAttendance.map(
                  (item) => (

                    <tr
                      key={
                        item.attendance_id ||
                        item.id
                      }
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {
                          item.attendance_id ||
                          item.id
                        }
                      </td>


                      <td className="p-4 font-medium">

                        {
                          item.full_name ||
                          `Staff #${item.staff_id}`
                        }

                      </td>


                      <td className="p-4">

                        {item.email || "-"}

                      </td>


                      <td className="p-4">

                        {
                          item.date
                            ? String(
                                item.date
                              ).split("T")[0]
                            : "-"
                        }

                      </td>


                      <td className="p-4">

                        {item.clock_in || "-"}

                      </td>


                      <td className="p-4">

                        {item.clock_out || "-"}

                      </td>


                      <td className="p-4">

                        <span
                          className={
                            item.status ===
                            "PRESENT"

                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                              : item.status ===
                                "ABSENT"

                              ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

                              : item.status ===
                                "LEAVE"

                              ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"

                              : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
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
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>


                          <button
                            onClick={() =>
                              handleDelete(
                                item.attendance_id ||
                                item.id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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

export default StaffAttendance;