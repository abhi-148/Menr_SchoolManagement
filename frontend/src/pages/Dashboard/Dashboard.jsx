import {
  useContext,
  useEffect,
  useState
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getDashboardData
} from "../../services/dashboardService";

import {
  AuthContext
} from "../../context/AuthContext";


function Dashboard() {

  const { role } =
    useContext(AuthContext);

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await getDashboardData();

      console.log(
        "FULL DASHBOARD RESPONSE:",
        response
      );

      /*
        Backend response:

        {
          success: true,
          message: "...",
          data: {
            statistics: {...}
          }
        }

        इसलिए दोनों possibilities handle कर रहे हैं.
      */

      const dashboardData =
        response?.data || response;

      console.log(
        "DASHBOARD DATA:",
        dashboardData
      );

      setDashboard(
        dashboardData
      );

    } catch (err) {

      console.error(
        "Dashboard Fetch Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <AdminLayout>

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

          <div className="bg-white rounded-xl shadow p-8 text-center">

            <div className="text-3xl mb-3">
              ⏳
            </div>

            <p className="text-gray-600">
              Loading dashboard...
            </p>

          </div>

        </div>

      </AdminLayout>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <AdminLayout>

        <div className="p-8">

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">

            <h2 className="font-bold text-lg mb-2">
              Dashboard Error
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Retry
            </button>

          </div>

        </div>

      </AdminLayout>
    );
  }


  const statistics =
    dashboard?.statistics || {};

  // =====================================================
  // STUDENT DASHBOARD
  // =====================================================

  if (role === "STUDENT") {

    return (
      <AdminLayout>

        <div className="p-8 bg-slate-100 min-h-screen">

          <div className="bg-white rounded-2xl shadow-sm p-8">

            <h1 className="text-3xl font-bold text-slate-800">
              🎓 Student Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              {dashboard?.message ||
                "Welcome Student"}
            </p>

          </div>

        </div>

      </AdminLayout>
    );
  }


  // =====================================================
  // STAFF DASHBOARD
  // =====================================================

  if (role === "STAFF") {

    return (
      <AdminLayout>

        <div className="p-8 bg-slate-100 min-h-screen">

          <h1 className="text-3xl font-bold mb-8">
            Staff Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <DashboardCard
              title="Total Students"
              value={statistics.totalStudents}
              icon="👨‍🎓"
            />

            <DashboardCard
              title="Present Today"
              value={statistics.presentToday}
              icon="🟢"
            />

            <DashboardCard
              title="Absent Today"
              value={statistics.absentToday}
              icon="🔴"
            />

          </div>

        </div>

      </AdminLayout>
    );
  }


  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

        <div className="bg-white border-b px-6 md:px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Welcome to School Management System
              </p>

            </div>

            <button
              onClick={loadDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg"
            >
              ↻ Refresh
            </button>

          </div>

        </div>


        <div className="p-6 md:p-8">


          {/* ============================================= */}
          {/* MAIN STATISTICS */}
          {/* ============================================= */}

          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <DashboardCard
              title="Total Schools"
              value={statistics.totalSchools}
              icon="🏫"
            />

            <DashboardCard
              title="Total Branches"
              value={statistics.totalBranches}
              icon="🏢"
            />

            <DashboardCard
              title="Total Students"
              value={statistics.totalStudents}
              icon="👨‍🎓"
            />

            <DashboardCard
              title="Total Staff"
              value={statistics.totalStaff}
              icon="👨‍🏫"
            />

            <DashboardCard
              title="Total Classes"
              value={statistics.totalClasses}
              icon="📚"
            />

            <DashboardCard
              title="Total Subjects"
              value={statistics.totalSubjects}
              icon="📖"
            />

            <DashboardCard
              title="Staff Types"
              value={statistics.totalStaffTypes}
              icon="👥"
            />

            <DashboardCard
              title="Departments"
              value={statistics.totalDepartments}
              icon="🏛️"
            />

          </div>


          {/* ============================================= */}
          {/* ATTENDANCE + FEES */}
          {/* ============================================= */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">


            {/* ATTENDANCE */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-xl font-bold">
                    Today's Attendance
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Current attendance overview
                  </p>

                </div>

                <div className="text-3xl">
                  📊
                </div>

              </div>


              <div className="grid grid-cols-3 gap-4">

                <SmallStat
                  title="Present"
                  value={statistics.presentToday}
                  className="text-green-600"
                />

                <SmallStat
                  title="Absent"
                  value={statistics.absentToday}
                  className="text-red-600"
                />

                <SmallStat
                  title="Attendance"
                  value={`${statistics.attendancePercentage || 0}%`}
                  className="text-blue-600"
                />

              </div>

            </div>


            {/* FEES */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-xl font-bold">
                    Fee Overview
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Collection summary
                  </p>

                </div>

                <div className="text-3xl">
                  💰
                </div>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <SmallStat
                  title="Today's Collection"
                  value={`₹${statistics.todayCollection || 0}`}
                  className="text-green-600"
                />

                <SmallStat
                  title="Total Collection"
                  value={`₹${statistics.totalCollection || 0}`}
                  className="text-blue-600"
                />

                <SmallStat
                  title="Fee Structures"
                  value={statistics.totalFeeStructures || 0}
                  className="text-purple-600"
                />

                <SmallStat
                  title="Active Students"
                  value={statistics.activeStudents || 0}
                  className="text-orange-600"
                />

              </div>

            </div>

          </div>


          {/* ============================================= */}
          {/* ACADEMIC OVERVIEW */}
          {/* ============================================= */}

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  Academic Overview
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Current academic information
                </p>

              </div>

              <div className="text-3xl">
                🎓
              </div>

            </div>


            <div className="grid md:grid-cols-4 gap-5">

              <DashboardCard
                title="Academic Years"
                value={statistics.totalAcademicYears || 0}
                icon="📅"
              />

              <DashboardCard
                title="Sessions"
                value={statistics.totalSessions || 0}
                icon="🗓️"
              />

              <DashboardCard
                title="Active Students"
                value={statistics.activeStudents || 0}
                icon="🟢"
              />

              <DashboardCard
                title="Inactive Students"
                value={statistics.inactiveStudents || 0}
                icon="⚪"
              />

            </div>


            {dashboard?.currentAcademicYear && (

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">

                <p className="text-sm text-blue-600 font-medium">
                  Current Academic Year
                </p>

                <h3 className="text-2xl font-bold text-blue-900 mt-1">
                  {dashboard.currentAcademicYear.academic_year_name}
                </h3>

                <p className="text-blue-700 mt-1">
                  Semester: {dashboard.currentAcademicYear.semester}
                </p>

              </div>

            )}


            {dashboard?.currentSession && (

              <div className="mt-4 bg-purple-50 border border-purple-100 rounded-xl p-5">

                <p className="text-sm text-purple-600 font-medium">
                  Current Session
                </p>

                <h3 className="text-xl font-bold text-purple-900 mt-1">
                  {dashboard.currentSession.session_name}
                </h3>

                <p className="text-purple-700 mt-1">
                  Session Number: {dashboard.currentSession.session_number}
                </p>

              </div>

            )}

          </div>

                    {/* ============================================= */}
          {/* SCHOOL & BRANCH OVERVIEW */}
          {/* ============================================= */}

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  School & Branch Overview
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Students and staff across active branches
                </p>
              </div>

              <div className="text-3xl">
                🏫
              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">
                      School
                    </th>

                    <th className="text-left py-3">
                      Branch
                    </th>

                    <th className="text-left py-3">
                      Students
                    </th>

                    <th className="text-left py-3">
                      Staff
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard?.branchWiseData?.length > 0 ? (

                    dashboard.branchWiseData.map((branch) => (

                      <tr
                        key={branch.branchId}
                        className="border-b hover:bg-slate-50"
                      >

                        <td className="py-4 font-medium">
                          {branch.schoolName || "-"}
                        </td>

                        <td>
                          <div>
                            <p className="font-medium">
                              {branch.branchName || "-"}
                            </p>

                            {branch.branchCode && (
                              <p className="text-xs text-gray-500">
                                {branch.branchCode}
                              </p>
                            )}
                          </div>
                        </td>

                        <td>
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                            {branch.totalStudents || 0}
                          </span>
                        </td>

                        <td>
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            {branch.totalStaff || 0}
                          </span>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-8 text-gray-500"
                      >
                        No branch data found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

                    {/* ============================================= */}
          {/* UPCOMING EVENTS */}
          {/* ============================================= */}

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Upcoming Events
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Latest upcoming school events
                </p>
              </div>

              <div className="text-3xl">
                📅
              </div>

            </div>

            <div className="space-y-4">

              {dashboard?.upcomingEvents?.length > 0 ? (

                dashboard.upcomingEvents.map((event) => (

                  <div
                    key={event.id}
                    className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-lg text-slate-800">
                          {event.event_name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {event.event_type || "Event"}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

                          <span>
                            📅{" "}
                            {event.event_date
                              ? new Date(
                                  event.event_date
                                ).toLocaleDateString()
                              : "-"
                            }
                          </span>

                          {event.start_time && (
                            <span>
                              🕐 {event.start_time}
                            </span>
                          )}

                          {event.venue && (
                            <span>
                              📍 {event.venue}
                            </span>
                          )}

                        </div>

                      </div>

                      <div className="text-right">

                        {event.schoolName && (
                          <p className="font-medium text-blue-600">
                            {event.schoolName}
                          </p>
                        )}

                        {event.branchName && (
                          <p className="text-sm text-gray-500">
                            {event.branchName}
                          </p>
                        )}

                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                          {event.status || "ACTIVE"}
                        </span>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div className="text-center py-8 text-gray-500">
                  No upcoming events found
                </div>

              )}

            </div>

          </div>


          {/* ============================================= */}
          {/* RECENT STUDENTS + STAFF */}
          {/* ============================================= */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">


            {/* STUDENTS */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold mb-5">
                Recently Added Students
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-3">
                        Name
                      </th>

                      <th className="text-left py-3">
                        Class
                      </th>

                      <th className="text-left py-3">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {dashboard?.latestStudents?.length > 0 ? (

                      dashboard.latestStudents.map(
                        (student) => (

                          <tr
                            key={student.id}
                            className="border-b"
                          >

                            <td className="py-3 font-medium">
                              {student.full_name}
                            </td>

                            <td>
                              {student.class_name || "-"}
                            </td>

                            <td>
                              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                                {student.status || "-"}
                              </span>
                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="3"
                          className="text-center py-6 text-gray-500"
                        >
                          No students found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* STAFF */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h2 className="text-xl font-bold mb-5">
                Recently Added Staff
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-3">
                        Name
                      </th>

                      <th className="text-left py-3">
                        Designation
                      </th>

                      <th className="text-left py-3">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {dashboard?.latestStaff?.length > 0 ? (

                      dashboard.latestStaff.map(
                        (staff) => (

                          <tr
                            key={staff.id}
                            className="border-b"
                          >

                            <td className="py-3 font-medium">
                              {staff.full_name}
                            </td>

                            <td>
                              {staff.designation || "-"}
                            </td>

                            <td>

                              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                                {staff.status || "-"}
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="3"
                          className="text-center py-6 text-gray-500"
                        >
                          No staff found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>


          {/* ============================================= */}
          {/* RECENT PAYMENTS */}
          {/* ============================================= */}

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

            <h2 className="text-xl font-bold mb-5">
              Recent Fee Payments
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">
                      Payment ID
                    </th>

                    <th className="text-left py-3">
                      Student ID
                    </th>

                    <th className="text-left py-3">
                      Amount
                    </th>

                    <th className="text-left py-3">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {dashboard?.recentPayments?.length > 0 ? (

                    dashboard.recentPayments.map(
                      (payment) => (

                        <tr
                          key={payment.id}
                          className="border-b"
                        >

                          <td className="py-3">
                            #{payment.id}
                          </td>

                          <td>
                            {payment.student_id}
                          </td>

                          <td className="font-semibold text-green-600">
                            ₹{payment.amount_paid}
                          </td>

                          <td>
                            {payment.payment_date
                              ? new Date(
                                  payment.payment_date
                                ).toLocaleDateString()
                              : "-"
                            }
                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                      >
                        No recent payments
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>


        </div>

      </div>

    </AdminLayout>
  );
}


// =========================================================
// REUSABLE COMPONENTS
// =========================================================

function DashboardCard({
  title,
  value,
  icon
}) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value ?? 0}
          </h2>

        </div>

        <div className="text-3xl">
          {icon}
        </div>

      </div>

    </div>
  );
}


function SmallStat({
  title,
  value,
  className
}) {

  return (

    <div className="bg-slate-50 rounded-xl p-4">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-2 ${className}`}
      >
        {value}
      </p>

    </div>
  );
}


export default Dashboard;