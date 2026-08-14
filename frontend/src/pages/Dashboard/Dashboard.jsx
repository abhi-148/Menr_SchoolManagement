import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import SuperAdminDashboard
  from "../SuperAdminDashboard/SuperAdminDashboard";

import SchoolAdminDashboard
  from "../SchoolAdminDashboard/SchoolAdminDashboard";

import StaffDashboard
  from "../StaffDashboard/StaffDashboard";

import StudentDashboard
  from "../StudentDashboard/StudentDashboard";


function Dashboard() {

  const { role } = useContext(AuthContext);


  // =========================================================
  // ROLE BASED DASHBOARD
  // =========================================================

  switch (role) {

    case "SUPER_ADMIN":

      return (
        <SuperAdminDashboard />
      );


    case "SCHOOL_ADMIN":

      return (
        <SchoolAdminDashboard />
      );


    case "STAFF":

      return (
        <StaffDashboard />
      );


    case "STUDENT":

      return (
        <StudentDashboard />
      );


    default:

      return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-md">

            <div className="text-4xl mb-4">
              🔐
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Invalid User Role
            </h2>

            <p className="text-slate-500 mt-2">
              We could not determine your dashboard access.
              Please login again.
            </p>

          </div>

        </div>

      );

  }

}


export default Dashboard;