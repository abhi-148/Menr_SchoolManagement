import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { getDashboardData } from "../../services/dashboardService";

import {
  Users,
  GraduationCap,
  ClipboardCheck,
  CalendarDays,
  Clock3,
  FileText,
  RefreshCw,
  UserCheck,
  UserX,
  TrendingUp,
  BookOpen,
  Briefcase
} from "lucide-react";

function StaffDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


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

      const response = await getDashboardData();

      const data =
        response?.data || response;

      setDashboard(data);

    } catch (err) {

      console.error(
        "STAFF DASHBOARD ERROR:",
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
              <Briefcase size={24} />
            </div>

            <p className="text-slate-600 font-medium">
              Loading Staff Dashboard...
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

  const latestStudents =
    dashboard?.latestStudents || [];

  const upcomingEvents =
    dashboard?.upcomingEvents || [];


  // Safe fallbacks for future API fields
  const mySchedules =
    dashboard?.mySchedules ||
    dashboard?.staffSchedules ||
    [];

  const myLeaves =
    dashboard?.myLeaves ||
    dashboard?.leaveRequests ||
    [];


  const pendingLeaves =
    myLeaves.filter(
      (item) =>
        item.status === "PENDING"
    ).length;


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

                <span className="w-2 h-2 rounded-full bg-blue-600" />

                Staff Portal

              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Staff Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Your daily academic and school activity overview.
              </p>

            </div>

            <button
              onClick={loadDashboard}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

          </div>

        </div>


        <div className="p-6 md:p-8">


          {/* ===================================================
              MAIN STATS
          =================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <StatCard
              title="Students"
              value={statistics.totalStudents ?? 0}
              icon={<GraduationCap size={22} />}
              iconClass="bg-blue-100 text-blue-600"
              bgClass="bg-blue-50"
            />

            <StatCard
              title="Present Today"
              value={statistics.presentToday ?? 0}
              icon={<UserCheck size={22} />}
              iconClass="bg-green-100 text-green-600"
              bgClass="bg-green-50"
            />

            <StatCard
              title="Absent Today"
              value={statistics.absentToday ?? 0}
              icon={<UserX size={22} />}
              iconClass="bg-red-100 text-red-600"
              bgClass="bg-red-50"
            />

            <StatCard
              title="Attendance Rate"
              value={`${statistics.attendancePercentage ?? 0}%`}
              icon={<TrendingUp size={22} />}
              iconClass="bg-purple-100 text-purple-600"
              bgClass="bg-purple-50"
            />

          </div>


          {/* ===================================================
              TODAY OVERVIEW
          =================================================== */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">


            <SectionCard
              title="Today's Attendance"
              description="Current school attendance"
              icon={<ClipboardCheck size={21} />}
            >

              <div className="grid grid-cols-3 gap-4">

                <Metric
                  title="Present"
                  value={statistics.presentToday ?? 0}
                  className="text-green-600"
                  icon={<UserCheck size={17} />}
                />

                <Metric
                  title="Absent"
                  value={statistics.absentToday ?? 0}
                  className="text-red-600"
                  icon={<UserX size={17} />}
                />

                <Metric
                  title="Rate"
                  value={`${statistics.attendancePercentage ?? 0}%`}
                  className="text-blue-600"
                  icon={<TrendingUp size={17} />}
                />

              </div>

            </SectionCard>


            <SectionCard
              title="My Work"
              description="Quick overview of your daily activities"
              icon={<Briefcase size={21} />}
            >

              <div className="grid grid-cols-2 gap-4">

                <QuickMetric
                  title="My Schedules"
                  value={mySchedules.length}
                  icon={<Clock3 size={18} />}
                />

                <QuickMetric
                  title="Pending Leaves"
                  value={pendingLeaves}
                  icon={<FileText size={18} />}
                />

              </div>

            </SectionCard>

          </div>


          {/* ===================================================
              MY TIMETABLE
          =================================================== */}

          <SectionCard
            title="My Schedule"
            description="Your assigned staff schedules"
            icon={<Clock3 size={21} />}
            className="mt-8"
          >

            {mySchedules.length > 0 ? (

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                {mySchedules.map((schedule) => (

                  <div
                    key={
                      schedule.schedule_id ||
                      schedule.id
                    }
                    className="border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition"
                  >

                    <div className="flex items-center justify-between">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Clock3 size={19} />
                      </div>

                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {schedule.status || "ACTIVE"}
                      </span>

                    </div>

                    <h3 className="font-semibold text-slate-800 mt-4">
                      {schedule.subject_name ||
                        `Subject #${schedule.subject_id}`}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {schedule.class_name ||
                        `Class #${schedule.class_id}`}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">

                      <p>
                        📅 {schedule.day_of_week || "-"}
                      </p>

                      <p>
                        🕐{" "}
                        {schedule.period_name ||
                          `Period #${schedule.period_id}`}
                      </p>

                      <p>
                        📍 {schedule.room || "-"}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <EmptyState
                icon={<Clock3 size={22} />}
                text="No schedule data available"
              />

            )}

          </SectionCard>


          {/* ===================================================
              STUDENTS
          =================================================== */}

          <SectionCard
            title="Recently Added Students"
            description="Latest student records"
            icon={<GraduationCap size={21} />}
            className="mt-8"
          >

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="text-left py-3 text-sm text-slate-600">
                      Student
                    </th>

                    <th className="text-left py-3 text-sm text-slate-600">
                      Class
                    </th>

                    <th className="text-left py-3 text-sm text-slate-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {latestStudents.length > 0 ? (

                    latestStudents.map((student) => (

                      <tr
                        key={student.id}
                        className="border-b border-slate-100"
                      >

                        <td className="py-3">

                          <div className="font-medium">
                            {student.full_name}
                          </div>

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

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="3"
                        className="text-center py-7 text-slate-500"
                      >
                        No students found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </SectionCard>


          {/* ===================================================
              MY LEAVE REQUESTS
          =================================================== */}

          <SectionCard
            title="My Leave Requests"
            description="Recent leave request status"
            icon={<FileText size={21} />}
            className="mt-8"
          >

            {myLeaves.length > 0 ? (

              <div className="space-y-3">

                {myLeaves.slice(0, 5).map((leave) => (

                  <div
                    key={leave.leave_id || leave.id}
                    className="border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >

                    <div>

                      <p className="font-medium">
                        {leave.leave_type || "Leave"}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">

                        {leave.start_date
                          ? String(
                              leave.start_date
                            ).split("T")[0]
                          : "-"}{" "}

                        →{" "}

                        {leave.end_date
                          ? String(
                              leave.end_date
                            ).split("T")[0]
                          : "-"}

                      </p>

                    </div>


                    <span
                      className={
                        leave.status === "APPROVED"
                          ? "px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"
                          : leave.status === "REJECTED"
                          ? "px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium"
                          : "px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium"
                      }
                    >
                      {leave.status || "PENDING"}
                    </span>

                  </div>

                ))}

              </div>

            ) : (

              <EmptyState
                icon={<FileText size={22} />}
                text="No leave requests found"
              />

            )}

          </SectionCard>


          {/* ===================================================
              UPCOMING EVENTS
          =================================================== */}

          <SectionCard
            title="Upcoming Events"
            description="Latest school events"
            icon={<CalendarDays size={21} />}
            className="mt-8"
          >

            {upcomingEvents.length > 0 ? (

              <div className="space-y-4">

                {upcomingEvents.map((event) => (

                  <div
                    key={event.id}
                    className="border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-lg">
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


                      <span className="self-start md:self-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                        {event.status || "ACTIVE"}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <EmptyState
                icon={<CalendarDays size={22} />}
                text="No upcoming events found"
              />

            )}

          </SectionCard>


          {/* ===================================================
              QUICK ACCESS
          =================================================== */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            <QuickAction
              title="My Schedule"
              description="View assigned periods"
              icon={<Clock3 size={21} />}
            />

            <QuickAction
              title="Attendance"
              description="Check attendance records"
              icon={<ClipboardCheck size={21} />}
            />

            <QuickAction
              title="Students"
              description="View student records"
              icon={<GraduationCap size={21} />}
            />

            <QuickAction
              title="Leave Requests"
              description="Manage your leave"
              icon={<FileText size={21} />}
            />

          </div>

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
  iconClass,
  bgClass
}) {

  return (

    <div
      className={`${bgClass} rounded-2xl border border-slate-100 p-5 hover:shadow-md transition`}
    >

      <div className="flex items-start justify-between">

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
// SECTION CARD
// =========================================================

function SectionCard({
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
// METRIC
// =========================================================

function Metric({
  title,
  value,
  className,
  icon
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
// QUICK METRIC
// =========================================================

function QuickMetric({
  title,
  value,
  icon
}) {

  return (

    <div className="bg-slate-50 rounded-xl p-4">

      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-sm text-slate-500">
          {title}
        </span>
      </div>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// MINI CARD
// =========================================================

function MiniCard() {
  return null;
}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState({
  icon,
  text
}) {

  return (

    <div className="text-center py-8">

      <div className="w-11 h-11 mx-auto rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-3">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
}


// =========================================================
// QUICK ACTION
// =========================================================

function QuickAction({
  title,
  description,
  icon
}) {

  return (

    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition">

      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>

    </div>
  );
}


export default StaffDashboard;