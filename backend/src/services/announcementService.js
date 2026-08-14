const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getMyAnnouncements
} = require(
  "../repositories/announcementRepository"
);


// =========================================================
// VALIDATE ANNOUNCEMENT
// =========================================================

const validateAnnouncement = (
  data
) => {

  if (!data.title?.trim()) {

    throw new Error(
      "Announcement title is required."
    );

  }


  if (!data.description?.trim()) {

    throw new Error(
      "Announcement description is required."
    );

  }


  const allowedAudiences = [
    "ALL",
    "STAFF",
    "STUDENTS"
  ];


  if (
    !allowedAudiences.includes(
      data.audience
    )
  ) {

    throw new Error(
      "Invalid announcement audience."
    );

  }


  const allowedPriorities = [
    "LOW",
    "NORMAL",
    "HIGH"
  ];


  if (
    !allowedPriorities.includes(
      data.priority
    )
  ) {

    throw new Error(
      "Invalid announcement priority."
    );

  }


  const allowedStatuses = [
    "DRAFT",
    "PUBLISHED",
    "EXPIRED"
  ];


  if (
    !allowedStatuses.includes(
      data.status
    )
  ) {

    throw new Error(
      "Invalid announcement status."
    );

  }

};


// =========================================================
// CREATE
// =========================================================

const createAnnouncementService =
async (
  data,
  user
) => {

  validateAnnouncement(
    data
  );


  let schoolId = null;


  if (
    user.role !== "SUPER_ADMIN"
  ) {

    schoolId =
      user.schoolId;

    if (!schoolId) {

      throw new Error(
        "School ID is required."
      );

    }

  }


  const publishAt =
    data.publish_at ||
    new Date();


  const result =
    await createAnnouncement({

      school_id:
        schoolId,

      created_by:
        user.id,

      title:
        data.title.trim(),

      description:
        data.description.trim(),

      audience:
        data.audience || "ALL",

      priority:
        data.priority || "NORMAL",

      publish_at:
        publishAt,

      expires_at:
        data.expires_at || null,

      status:
        data.status || "PUBLISHED"

    });


  return {
    id: result.insertId,
    message:
      "Announcement Created Successfully"
  };

};


// =========================================================
// GET ALL
// =========================================================

const getAllAnnouncementsService =
async (
  user
) => {

  return await getAllAnnouncements(
    user
  );

};


// =========================================================
// GET BY ID
// =========================================================

const getAnnouncementByIdService =
async (
  id
) => {

  const announcement =
    await getAnnouncementById(
      id
    );


  if (!announcement) {

    throw new Error(
      "Announcement Not Found"
    );

  }


  return announcement;

};


// =========================================================
// UPDATE
// =========================================================

const updateAnnouncementService =
async (
  id,
  data,
  user
) => {

  const existing =
    await getAnnouncementById(
      id
    );


  if (!existing) {

    throw new Error(
      "Announcement Not Found"
    );

  }


  if (
    user.role === "SCHOOL_ADMIN" &&
    Number(existing.school_id) !==
      Number(user.schoolId)
  ) {

    throw new Error(
      "Access Denied"
    );

  }


  validateAnnouncement(
    data
  );


  await updateAnnouncement(
    id,
    {
      title:
        data.title.trim(),

      description:
        data.description.trim(),

      audience:
        data.audience,

      priority:
        data.priority,

      publish_at:
        data.publish_at,

      expires_at:
        data.expires_at || null,

      status:
        data.status

    }
  );


  return {
    message:
      "Announcement Updated Successfully"
  };

};


// =========================================================
// DELETE
// =========================================================

const deleteAnnouncementService =
async (
  id,
  user
) => {

  const existing =
    await getAnnouncementById(
      id
    );


  if (!existing) {

    throw new Error(
      "Announcement Not Found"
    );

  }


  if (
    user.role === "SCHOOL_ADMIN" &&
    Number(existing.school_id) !==
      Number(user.schoolId)
  ) {

    throw new Error(
      "Access Denied"
    );

  }


  await deleteAnnouncement(
    id
  );


  return {
    message:
      "Announcement Deleted Successfully"
  };

};


// =========================================================
// MY ANNOUNCEMENTS
// =========================================================

const getMyAnnouncementsService =
async (
  user
) => {

  return await getMyAnnouncements(
    user
  );

};


module.exports = {

  createAnnouncementService,

  getAllAnnouncementsService,

  getAnnouncementByIdService,

  updateAnnouncementService,

  deleteAnnouncementService,

  getMyAnnouncementsService

};