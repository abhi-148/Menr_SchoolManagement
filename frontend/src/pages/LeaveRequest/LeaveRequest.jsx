import {
  useEffect,
  useState,
  useContext
} from "react";

import { AuthContext } from "../../context/AuthContext";

import AdminLayout from "../../layouts/AdminLayout";
import AddLeaveRequest from "./AddLeaveRequest";

import {
  getLeaveRequests,
  createLeaveRequest,
  updateLeaveRequest,
  reviewLeaveRequest,
  deleteLeaveRequest
} from "../../services/leaveRequestService";


function LeaveRequest() {

  const [leaves, setLeaves] =
    useState([]);
    const { role } = useContext(AuthContext);

  const [editingLeave, setEditingLeave] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    fetchLeaves();

  }, []);


  const fetchLeaves = async () => {

    try {

      setLoading(true);

      const response =
        await getLeaveRequests();

      setLeaves(
        response.data || []
      );

    } catch (error) {

      console.error(
        "GET LEAVE REQUESTS ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  const handleAdd = async (data) => {

    try {

      if (editingLeave) {

        await updateLeaveRequest(
          editingLeave.leave_id,
          data
        );

        alert(
          "Leave Request Updated Successfully"
        );

        setEditingLeave(null);

      } else {

        await createLeaveRequest(
          data
        );

        alert(
          "Leave Request Created Successfully"
        );

      }

      fetchLeaves();

    } catch (error) {

      console.error(
        "SAVE LEAVE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  const handleEdit = (item) => {

    setEditingLeave(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const handleReview = async (
    id,
    status
  ) => {

    const comments =
      window.prompt(
        `Enter comments for ${status.toLowerCase()} leave:`
      );

    try {

      await reviewLeaveRequest(
        id,
        {
          status,
          comments
        }
      );

      alert(
        `Leave Request ${status} Successfully`
      );

      fetchLeaves();

    } catch (error) {

      console.error(
        "REVIEW LEAVE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to review leave request"
      );

    }

  };


  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this leave request?"
      )
    ) {
      return;
    }

    try {

      await deleteLeaveRequest(id);

      alert(
        "Leave Request Deleted Successfully"
      );

      fetchLeaves();

    } catch (error) {

      console.error(
        "DELETE LEAVE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to delete leave request"
      );

    }

  };


  const filteredLeaves =
    leaves.filter((item) => {

      const text =
        search.toLowerCase();

      return (

        String(
          item.staff_name || ""
        )
          .toLowerCase()
          .includes(text)

        ||

        String(
          item.staff_email || ""
        )
          .toLowerCase()
          .includes(text)

        ||

        String(
          item.leave_type || ""
        )
          .toLowerCase()
          .includes(text)

        ||

        String(
          item.status || ""
        )
          .toLowerCase()
          .includes(text)

      );

    });


  const pendingCount =
    leaves.filter(
      (item) =>
        item.status === "PENDING"
    ).length;

  const approvedCount =
    leaves.filter(
      (item) =>
        item.status === "APPROVED"
    ).length;

  const rejectedCount =
    leaves.filter(
      (item) =>
        item.status === "REJECTED"
    ).length;


  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">


        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Leave Requests
            </h1>

            <p className="text-gray-500">
              Manage Staff Leave Requests
            </p>

          </div>


          <button
            onClick={fetchLeaves}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Total
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {leaves.length}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Pending
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {pendingCount}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Approved
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {approvedCount}
            </h2>

          </div>


          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Rejected
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {rejectedCount}
            </h2>

          </div>

        </div>


        {role === "STAFF" && (
  <AddLeaveRequest
    onAdd={handleAdd}
    editingLeave={editingLeave}
    cancelEdit={() =>
      setEditingLeave(null)
    }
  />
)}


        <div className="bg-white p-4 rounded-xl shadow mb-4">

          <input
            type="text"
            placeholder="Search staff, email, leave type or status..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>


        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Staff
                </th>

                <th className="p-4 text-left">
                  Leave Type
                </th>

                <th className="p-4 text-left">
                  Start Date
                </th>

                <th className="p-4 text-left">
                  End Date
                </th>

                <th className="p-4 text-left">
                  Days
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Reason
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
                    colSpan="9"
                    className="text-center p-6"
                  >
                    Loading Leave Requests...
                  </td>

                </tr>

              ) : filteredLeaves.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    className="text-center p-6 text-gray-500"
                  >
                    No Leave Requests Found
                  </td>

                </tr>

              ) : (

                filteredLeaves.map(
                  (item) => (

                    <tr
                      key={item.leave_id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {item.leave_id}
                      </td>

                      <td className="p-4">

                        <div className="font-medium">
                          {item.staff_name || "-"}
                        </div>

                        <div className="text-sm text-gray-500">
                          {item.staff_email || ""}
                        </div>

                      </td>

                      <td className="p-4">
                        {item.leave_type}
                      </td>

                      <td className="p-4">
                        {item.start_date
                          ? String(
                              item.start_date
                            ).split("T")[0]
                          : "-"}
                      </td>

                      <td className="p-4">
                        {item.end_date
                          ? String(
                              item.end_date
                            ).split("T")[0]
                          : "-"}
                      </td>

                      <td className="p-4">
                        {item.total_days}
                      </td>

                      <td className="p-4">

                        <span
                          className={
                            item.status ===
                            "PENDING"
                              ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                              : item.status ===
                                "APPROVED"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                              : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="p-4">
                        {item.reason || "-"}
                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                        {item.status === "PENDING" && (
  <>

    {role === "STAFF" && (
      <>
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
            handleDelete(item.leave_id)
          }
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </>
    )}

    {(role === "SUPER_ADMIN" ||
      role === "SCHOOL_ADMIN") && (
      <>
        <button
          onClick={() =>
            handleReview(
              item.leave_id,
              "APPROVED"
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Approve
        </button>

        <button
          onClick={() =>
            handleReview(
              item.leave_id,
              "REJECTED"
            )
          }
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </>
    )}

  </>
)}

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

export default LeaveRequest;