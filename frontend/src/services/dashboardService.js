import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");

  console.log("RAW DASHBOARD API RESPONSE:", response.data);

  return response.data.data;
};