const {
  getDashboardStats,
  getSchoolDashboardStats
} = require("../repositories/dashboardRepository");

const getDashboardService = async (user) => {

  if (!user) {
    throw new Error("Unauthorized user.");
  }

  switch (user.role) {

    case "SUPER_ADMIN":
      return await getDashboardStats();

    case "SCHOOL_ADMIN": {

      const schoolId =
        user.schoolId || user.school_id;

      if (!schoolId) {
        throw new Error("School ID not found.");
      }

      return await getSchoolDashboardStats(
        schoolId
      );
    }

    case "STAFF": {

      const schoolId =
        user.school_id || user.schoolId;

      if (!schoolId) {
        throw new Error("School ID not found.");
      }

      return await getSchoolDashboardStats(
        schoolId
      );
    }

    case "STUDENT":

      return {
        statistics: {
          totalStudents: 1,
          presentToday: 0,
          absentToday: 0,
          attendancePercentage: 0
        },

        latestStudents: [],

        latestStaff: [],

        message:
          `Welcome ${user.full_name || "Student"}`
      };

    default:
      throw new Error("Invalid user role.");
  }
};

module.exports = {
  getDashboardService
};