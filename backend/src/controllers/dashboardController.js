const {
  getDashboardService,
} = require("../services/dashboardService");

const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardService(req.user);

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: dashboard,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

module.exports = {
  getDashboard,
};