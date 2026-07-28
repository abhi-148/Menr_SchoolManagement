const {
  getDashboardStats,
  getSchoolDashboardStats,
} = require("../repositories/dashboardRepository");

const getDashboardService = async (user) => {
  if (!user) {
    throw new Error("Unauthorized user.");
  }

  switch (user.role) {
    case "SUPER_ADMIN": {
      return await getDashboardStats();
    }

    case "SCHOOL_ADMIN": {
      if (!user.schoolId) {
        throw new Error("School ID not found.");
      }

      return await getSchoolDashboardStats(user.schoolId);
    }

    case "STAFF": {
      if (!user.school_id && !user.schoolId) {
        throw new Error("School ID not found.");
      }

      return await getSchoolDashboardStats(
        user.school_id || user.schoolId
      );
    }

    case "STUDENT": {
      return {
        statistics: {
          totalStudents: 1,
          presentToday: 0,
          absentToday: 0,
          attendancePercentage: 0,
        },

        latestStudents: [],

        latestStaff: [],

        message: `Welcome ${user.full_name || "Student"}`,
      };
    }

    default:
      throw new Error("Invalid user role.");
  }
};

module.exports = {
  getDashboardService,
};