import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getDashboardData } from "../../services/dashboardService";

import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  CalendarDays,
  RefreshCw,
  TrendingUp,
  UserCheck,
  UserX,
  IndianRupee,
  School,
  Layers,
  Clock3
} from "lucide-react";

function SuperAdminDashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getDashboardData();

      const data =
        response?.data || response;

      setDashboard(data);

    } catch (err) {

      console.error(
        "SUPER ADMIN DASHBOARD ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <AdminLayout>

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">

            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 animate-pulse">

              <Building2 size={24} />

            </div>

            <p className="text-slate-600 font-medium">
              Loading Super Admin Dashboard...
            </p>

          </div>

        </div>

      </AdminLayout>

    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (

      <AdminLayout>

        <div className="p-6 md:p-8 min-h-screen bg-slate-100">

          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6">

            <h2 className="text-lg font-bold text-red-700">
              Dashboard Error
            </h2>

            <p className="text-red-600 mt-2">
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="mt-5 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl"
            >
              <RefreshCw size={17} />
              Retry
            </button>

          </div>

        </div>

      </AdminLayout>

    );

  }


  const statistics =
    dashboard?.statistics || {};

  const branchWiseData =
    dashboard?.branchWiseData || [];

  const upcomingEvents =
    dashboard?.upcomingEvents || [];

  const latestStudents =
    dashboard?.latestStudents || [];

  const latestStaff =
    dashboard?.latestStaff || [];

  const recentPayments =
    dashboard?.recentPayments || [];


  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-100">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-white border-b border-slate-200 px-6 md:px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">

                <SparklineDot />

                Super Admin

              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">

                Super Admin Dashboard

              </h1>

              <p className="text-slate-500 mt-1">

                Complete overview of schools, staff, students and operations.

              </p>

            </div>


            <button
              onClick={loadDashboard}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm"
            >

              <RefreshCw size={17} />

              Refresh

            </button>

          </div>

        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="p-6 md:p-8">


          {/* ===================================================
              OVERVIEW CARDS
          =================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


            <StatCard
              title="Total Schools"
              value={statistics.totalSchools}
              icon={<School size={22} />}
              wrapper="bg-blue-50"
              iconClass="bg-blue-100 text-blue-600"
            />

            <StatCard
              title="Total Branches"
              value={statistics.totalBranches}
              icon={<Building2 size={22} />}
              wrapper="bg-indigo-50"
              iconClass="bg-indigo-100 text-indigo-600"
            />

            <StatCard
              title="Total Students"
              value={statistics.totalStudents}
              icon={<GraduationCap size={22} />}
              wrapper="bg-orange-50"
              iconClass="bg-orange-100 text-orange-600"
            />

            <StatCard
              title="Total Staff"
              value={statistics.totalStaff}
              icon={<Users size={22} />}
              wrapper="bg-green-50"
              iconClass="bg-green-100 text-green-600"
            />

            <StatCard
              title="Total Classes"
              value={statistics.totalClasses}
              icon={<BookOpen size={22} />}
              wrapper="bg-purple-50"
              iconClass="bg-purple-100 text-purple-600"
            />

            <StatCard
              title="Total Subjects"
              value={statistics.totalSubjects}
              icon={<Layers size={22} />}
              wrapper="bg-pink-50"
              iconClass="bg-pink-100 text-pink-600"
            />

            <StatCard
              title="Staff Types"
              value={statistics.totalStaffTypes}
              icon={<Users size={22} />}
              wrapper="bg-cyan-50"
              iconClass="bg-cyan-100 text-cyan-600"
            />

            <StatCard
              title="Departments"
              value={statistics.totalDepartments}
              icon={<Building2 size={22} />}
              wrapper="bg-slate-100"
              iconClass="bg-slate-200 text-slate-600"
            />

          </div>


          {/* ===================================================
              ATTENDANCE + FEES
          =================================================== */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">


            {/* ATTENDANCE */}

            <DashboardSection
              title="Today's Attendance"
              description="Current attendance overview"
              icon={<ClipboardCheck size={21} />}
            >

              <div className="grid grid-cols-3 gap-4">

                <MetricBox
                  title="Present"
                  value={statistics.presentToday ?? 0}
                  icon={<UserCheck size={18} />}
                  className="text-green-600"
                />

                <MetricBox
                  title="Absent"
                  value={statistics.absentToday ?? 0}
                  icon={<UserX size={18} />}
                  className="text-red-600"
                />

                <MetricBox
                  title="Attendance"
                  value={`${statistics.attendancePercentage ?? 0}%`}
                  icon={<TrendingUp size={18} />}
                  className="text-blue-600"
                />

              </div>

            </DashboardSection>


            {/* FEES */}

            <DashboardSection
              title="Fee Overview"
              description="Collection summary"
              icon={<IndianRupee size={21} />}
            >

              <div className="grid grid-cols-2 gap-4">

                <MetricBox
                  title="Today's Collection"
                  value={`₹${statistics.todayCollection ?? 0}`}
                  icon={<IndianRupee size={18} />}
                  className="text-green-600"
                />

                <MetricBox
                  title="Total Collection"
                  value={`₹${statistics.totalCollection ?? 0}`}
                  icon={<CreditCard size={18} />}
                  className="text-blue-600"
                />

                <MetricBox
                  title="Fee Structures"
                  value={statistics.totalFeeStructures ?? 0}
                  icon={<Layers size={18} />}
                  className="text-purple-600"
                />

                <MetricBox
                  title="Active Students"
                  value={statistics.activeStudents ?? 0}
                  icon={<Users size={18} />}
                  className="text-orange-600"
                />

              </div>

            </DashboardSection>

          </div>


          {/* ===================================================
              ACADEMIC OVERVIEW
          =================================================== */}

          <DashboardSection
            title="Academic Overview"
            description="Current academic information"
            icon={<GraduationCap size={21} />}
            className="mt-8"
          >

            <div className="grid md:grid-cols-4 gap-5">

              <MetricCard
                title="Academic Years"
                value={statistics.totalAcademicYears ?? 0}
                icon={<CalendarDays size={21} />}
              />

              <MetricCard
                title="Sessions"
                value={statistics.totalSessions ?? 0}
                icon={<Clock3 size={21} />}
              />

              <MetricCard
                title="Active Students"
                value={statistics.activeStudents ?? 0}
                icon={<UserCheck size={21} />}
              />

              <MetricCard
                title="Inactive Students"
                value={statistics.inactiveStudents ?? 0}
                icon={<UserX size={21} />}
              />

            </div>


            {dashboard?.currentAcademicYear && (

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">

                <p className="text-sm text-blue-600 font-medium">
                  Current Academic Year
                </p>

                <h3 className="text-2xl font-bold text-blue-900 mt-1">
                  {dashboard.currentAcademicYear.academic_year_name}
                </h3>

                <p className="text-blue-700 mt-1">
                  Semester:{" "}
                  {dashboard.currentAcademicYear.semester || "-"}
                </p>

              </div>

            )}


            {dashboard?.currentSession && (

              <div className="mt-4 bg-purple-50 border border-purple-100 rounded-2xl p-5">

                <p className="text-sm text-purple-600 font-medium">
                  Current Session
                </p>

                <h3 className="text-xl font-bold text-purple-900 mt-1">
                  {dashboard.currentSession.session_name}
                </h3>

                <p className="text-purple-700 mt-1">
                  Session Number:{" "}
                  {dashboard.currentSession.session_number}
                </p>

              </div>

            )}

          </DashboardSection>


          {/* ===================================================
              SCHOOL + BRANCH
          =================================================== */}

          <DashboardSection
            title="School & Branch Overview"
            description="Students and staff across active branches"
            icon={<Building2 size={21} />}
            className="mt-8"
          >

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-3 text-sm font-semibold text-slate-600">
                      School
                    </th>

                    <th className="text-left py-3 text-sm font-semibold text-slate-600">
                      Branch
                    </th>

                    <th className="text-left py-3 text-sm font-semibold text-slate-600">
                      Students
                    </th>

                    <th className="text-left py-3 text-sm font-semibold text-slate-600">
                      Staff
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {branchWiseData.length > 0 ? (

                    branchWiseData.map(
                      (branch) => (

                        <tr
                          key={
                            branch.branchId ||
                            branch.branch_id
                          }
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >

                          <td className="py-4 font-medium">
                            {branch.schoolName || "-"}
                          </td>

                          <td className="py-4">

                            <p className="font-medium">
                              {branch.branchName || "-"}
                            </p>

                            {branch.branchCode && (

                              <p className="text-xs text-slate-500">
                                {branch.branchCode}
                              </p>

                            )}

                          </td>

                          <td className="py-4">

                            <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                              {branch.totalStudents ?? 0}
                            </span>

                          </td>

                          <td className="py-4">

                            <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                              {branch.totalStaff ?? 0}
                            </span>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-8 text-slate-500"
                      >
                        No branch data found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </DashboardSection>


          {/* ===================================================
              UPCOMING EVENTS
          =================================================== */}

          <DashboardSection
            title="Upcoming Events"
            description="Latest upcoming school events"
            icon={<CalendarDays size={21} />}
            className="mt-8"
          >

            <div className="space-y-4">

              {upcomingEvents.length > 0 ? (

                upcomingEvents.map(
                  (event) => (

                    <div
                      key={event.id}
                      className="border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <h3 className="font-semibold text-lg text-slate-800">
                            {event.event_name}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {event.event_type || "Event"}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">

                            <span>
                              📅{" "}
                              {event.event_date
                                ? new Date(
                                    event.event_date
                                  ).toLocaleDateString()
                                : "-"}
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


                        <div className="md:text-right">

                          {event.schoolName && (

                            <p className="font-medium text-blue-600">
                              {event.schoolName}
                            </p>

                          )}

                          {event.branchName && (

                            <p className="text-sm text-slate-500">
                              {event.branchName}
                            </p>

                          )}

                          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                            {event.status || "ACTIVE"}
                          </span>

                        </div>

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="text-center py-8 text-slate-500">
                  No upcoming events found
                </div>

              )}

            </div>

          </DashboardSection>


          {/* ===================================================
              RECENT STUDENTS + STAFF
          =================================================== */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">


            <DashboardSection
              title="Recently Added Students"
              description="Latest student records"
              icon={<GraduationCap size={21} />}
            >

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-slate-200">

                      <th className="text-left py-3 text-sm">
                        Name
                      </th>

                      <th className="text-left py-3 text-sm">
                        Class
                      </th>

                      <th className="text-left py-3 text-sm">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {latestStudents.length > 0 ? (

                      latestStudents.map(
                        (student) => (

                          <tr
                            key={student.id}
                            className="border-b border-slate-100"
                          >

                            <td className="py-3 font-medium">
                              {student.full_name}
                            </td>

                            <td className="py-3">
                              {student.class_name || "-"}
                            </td>

                            <td className="py-3">

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
                          className="text-center py-6 text-slate-500"
                        >
                          No students found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </DashboardSection>


            <DashboardSection
              title="Recently Added Staff"
              description="Latest staff records"
              icon={<Users size={21} />}
            >

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-slate-200">

                      <th className="text-left py-3 text-sm">
                        Name
                      </th>

                      <th className="text-left py-3 text-sm">
                        Designation
                      </th>

                      <th className="text-left py-3 text-sm">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {latestStaff.length > 0 ? (

                      latestStaff.map(
                        (staff) => (

                          <tr
                            key={staff.id}
                            className="border-b border-slate-100"
                          >

                            <td className="py-3 font-medium">
                              {staff.full_name}
                            </td>

                            <td className="py-3">
                              {staff.designation || "-"}
                            </td>

                            <td className="py-3">

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
                          className="text-center py-6 text-slate-500"
                        >
                          No staff found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </DashboardSection>

          </div>


          {/* ===================================================
              RECENT PAYMENTS
          =================================================== */}

          <DashboardSection
            title="Recent Fee Payments"
            description="Latest fee transactions"
            icon={<CreditCard size={21} />}
            className="mt-8"
          >

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-3 text-sm">
                      Payment ID
                    </th>

                    <th className="text-left py-3 text-sm">
                      Student ID
                    </th>

                    <th className="text-left py-3 text-sm">
                      Amount
                    </th>

                    <th className="text-left py-3 text-sm">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentPayments.length > 0 ? (

                    recentPayments.map(
                      (payment) => (

                        <tr
                          key={payment.id}
                          className="border-b border-slate-100"
                        >

                          <td className="py-3">
                            #{payment.id}
                          </td>

                          <td className="py-3">
                            {payment.student_id}
                          </td>

                          <td className="py-3 font-semibold text-green-600">
                            ₹{payment.amount_paid}
                          </td>

                          <td className="py-3">

                            {payment.payment_date
                              ? new Date(
                                  payment.payment_date
                                ).toLocaleDateString()
                              : "-"}

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-6 text-slate-500"
                      >
                        No recent payments
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </DashboardSection>

        </div>

      </div>

    </AdminLayout>

  );

}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  icon,
  wrapper,
  iconClass
}) {

  return (

    <div
      className={`${wrapper} rounded-2xl border border-slate-100 p-5 hover:shadow-md transition`}
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-sm text-slate-600">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {value ?? 0}
          </h2>

        </div>


        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>

  );

}


// =========================================================
// DASHBOARD SECTION
// =========================================================

function DashboardSection({
  title,
  description,
  icon,
  children,
  className = ""
}) {

  return (

    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}
    >

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {title}
          </h2>

          {description && (

            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>

          )}

        </div>


        <div className="w-10 h-10 rounded-xl bg-slate-50 text-blue-600 flex items-center justify-center">

          {icon}

        </div>

      </div>

      {children}

    </div>

  );

}


// =========================================================
// METRIC BOX
// =========================================================

function MetricBox({
  title,
  value,
  icon,
  className
}) {

  return (

    <div className="bg-slate-50 rounded-xl p-4">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <span className={className}>
          {icon}
        </span>

      </div>

      <p
        className={`text-2xl font-bold mt-2 ${className}`}
      >
        {value}
      </p>

    </div>

  );

}


// =========================================================
// METRIC CARD
// =========================================================

function MetricCard({
  title,
  value,
  icon
}) {

  return (

    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">

      <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm">

        {icon}

      </div>

      <p className="text-sm text-slate-500 mt-4">
        {title}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>

  );

}


// =========================================================
// SMALL DOT
// =========================================================

function SparklineDot() {

  return (

    <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />

  );

}


export default SuperAdminDashboard;