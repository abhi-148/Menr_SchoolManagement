import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import {
  getAcademicYearSessions,
  createAcademicYearSession,
  updateAcademicYearSession,
  deleteAcademicYearSession,
} from "../../services/academicYearSessionService";

import {
  getAcademicYears,
} from "../../services/academicYearService";

function AcademicYearSessions() {

  const [sessions, setSessions] = useState([]);

  const [academicYearId, setAcademicYearId] =
    useState("");
    const [academicYears, setAcademicYears] =
  useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingSession, setEditingSession] =
    useState(null);

  const [formData, setFormData] = useState({
    academic_year_id: "",
    session_name: "",
    session_number: "",
    start_date: "",
    end_date: "",
    is_current: false,
    status: "ACTIVE",
  });

  // ==========================================
// Get Academic Years
// ==========================================
const fetchAcademicYears = async () => {
  try {
    const response = await getAcademicYears();

    setAcademicYears(
      response.data || []
    );
  } catch (error) {
    console.log(
      "Academic Year Fetch Error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to load academic years"
    );
  }
};

  // ==========================================
  // Get Sessions
  // ==========================================
  const fetchSessions = async () => {

    try {

      setLoading(true);

      const response =
        await getAcademicYearSessions(
          academicYearId || null
        );

      setSessions(
        response.data || []
      );

    } catch (error) {

      console.log(
        "Session Fetch Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load sessions"
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // Load Sessions
  // ==========================================
useEffect(() => {

  fetchAcademicYears();
  fetchSessions();

}, [academicYearId]);

  // ==========================================
  // Input Change
  // ==========================================
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,

        academic_year_id:
          Number(formData.academic_year_id),

        session_number:
          Number(formData.session_number),

        is_current:
          formData.is_current ? 1 : 0,
      };

      if (editingSession) {

        await updateAcademicYearSession(
          editingSession.session_id,
          payload
        );

        alert(
          "Academic Year Session Updated Successfully"
        );

      } else {

        await createAcademicYearSession(
          payload
        );

        alert(
          "Academic Year Session Created Successfully"
        );
      }

      resetForm();

      fetchSessions();

    } catch (error) {

      console.log(
        "Session Save Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // ==========================================
  // Edit
  // ==========================================
  const handleEdit = (session) => {

    setEditingSession(session);

    setFormData({
      academic_year_id:
        session.academic_year_id || "",

      session_name:
        session.session_name || "",

      session_number:
        session.session_number || "",

      start_date:
        session.start_date
          ?.split("T")[0] || "",

      end_date:
        session.end_date
          ?.split("T")[0] || "",

      is_current:
        Number(session.is_current) === 1,

      status:
        session.status || "ACTIVE",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // Delete
  // ==========================================
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this session?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteAcademicYearSession(id);

      alert(
        "Academic Year Session Deleted Successfully"
      );

      fetchSessions();

    } catch (error) {

      console.log(
        "Session Delete Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================
  const resetForm = () => {

    setEditingSession(null);

    setFormData({
      academic_year_id:
        academicYearId || "",

      session_name: "",

      session_number: "",

      start_date: "",

      end_date: "",

      is_current: false,

      status: "ACTIVE",
    });
  };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Academic Year Sessions
          </h1>

          <select
            value={academicYearId}
            onChange={(e) =>
              setAcademicYearId(
                e.target.value
              )
            }
            className="border p-3 rounded-lg bg-white"
          >

        
  <option value="">
    All Academic Years
  </option>

  {academicYears.map((academicYear) => (
    <option
      key={academicYear.id}
      value={academicYear.id}
    >
      {academicYear.academic_year_name}
      {" - ID: "}
      {academicYear.id}
    </option>
  ))}
</select>

        

        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm mb-8"
        >

          <h2 className="text-xl font-semibold mb-5">

            {editingSession
              ? "Update Academic Year Session"
              : "Add Academic Year Session"}

          </h2>

          <div className="grid md:grid-cols-2 gap-4">
<select
  name="academic_year_id"
  value={formData.academic_year_id}
  onChange={handleChange}
  className="border p-3 rounded-lg"
  required
>
  <option value="">
    Select Academic Year
  </option>

  {academicYears.map((academicYear) => (
    <option
      key={academicYear.id}
      value={academicYear.id}
    >
      {academicYear.academic_year_name}
      {" - ID: "}
      {academicYear.id}
    </option>
  ))}
</select>

            <input
              type="text"
              name="session_name"
              placeholder="Session Name"
              value={
                formData.session_name
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="session_number"
              placeholder="Session Number"
              value={
                formData.session_number
              }
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>

            </select>

            <div>

              <label className="text-sm text-gray-600">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={
                  formData.start_date
                }
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />

            </div>

            <div>

              <label className="text-sm text-gray-600">
                End Date
              </label>

              <input
                type="date"
                name="end_date"
                value={
                  formData.end_date
                }
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="is_current"
                checked={
                  formData.is_current
                }
                onChange={handleChange}
              />

              <label>
                Current Session
              </label>

            </div>

          </div>

          <div className="flex gap-3 mt-6">

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

              {editingSession
                ? "Update Session"
                : "Save Session"}

            </button>

            {editingSession && (

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>

            )}

          </div>

        </form>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Session Name
                </th>

                <th className="p-4 text-left">
                  Number
                </th>

                <th className="p-4 text-left">
                  Start Date
                </th>

                <th className="p-4 text-left">
                  End Date
                </th>

                <th className="p-4 text-left">
                  Current
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
                    Loading...
                  </td>

                </tr>

              ) : sessions.length > 0 ? (

                sessions.map((session) => (

                  <tr
                    key={session.session_id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {session.session_id}
                    </td>

                    <td className="p-4 font-medium">
                      {session.session_name}
                    </td>

                    <td className="p-4">
                      {session.session_number}
                    </td>

                    <td className="p-4">
                      {session.start_date}
                    </td>

                    <td className="p-4">
                      {session.end_date}
                    </td>

                    <td className="p-4">

                      {Number(
                        session.is_current
                      ) === 1 ? (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Current
                        </span>

                      ) : (

                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          No
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      {session.status}

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(session)
                          }
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              session.session_id
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500"
                  >
                    No Sessions Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AcademicYearSessions;