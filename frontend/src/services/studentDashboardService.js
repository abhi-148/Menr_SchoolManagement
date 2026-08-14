import api from "./api";

export const getStudentDashboard =
  async () => {

    const response =
      await api.get(
        "/students/dashboard"
      );

    return response.data;

  };