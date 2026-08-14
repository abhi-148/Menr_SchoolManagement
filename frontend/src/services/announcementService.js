import api from "./api";


// =========================================================
// GET ALL ANNOUNCEMENTS
// =========================================================

export const getAnnouncements = async () => {

  const response =
    await api.get(
      "/announcements"
    );

  return response.data;

};


// =========================================================
// GET MY ANNOUNCEMENTS
// =========================================================

export const getMyAnnouncements = async () => {

  const response =
    await api.get(
      "/announcements/my"
    );

  return response.data;

};


// =========================================================
// GET ANNOUNCEMENT BY ID
// =========================================================

export const getAnnouncementById = async (
  id
) => {

  const response =
    await api.get(
      `/announcements/${id}`
    );

  return response.data;

};


// =========================================================
// CREATE
// =========================================================

export const createAnnouncement = async (
  data
) => {

  const response =
    await api.post(
      "/announcements",
      data
    );

  return response.data;

};


// =========================================================
// UPDATE
// =========================================================

export const updateAnnouncement = async (
  id,
  data
) => {

  const response =
    await api.put(
      `/announcements/${id}`,
      data
    );

  return response.data;

};


// =========================================================
// DELETE
// =========================================================

export const deleteAnnouncement = async (
  id
) => {

  const response =
    await api.delete(
      `/announcements/${id}`
    );

  return response.data;

};