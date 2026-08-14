const {
  createAnnouncementService,
  getAllAnnouncementsService,
  getAnnouncementByIdService,
  updateAnnouncementService,
  deleteAnnouncementService,
  getMyAnnouncementsService
} = require(
  "../services/announcementService"
);


// =========================================================
// CREATE
// =========================================================

const createAnnouncement = async (
  req,
  res
) => {

  try {

    const result =
      await createAnnouncementService(
        req.body,
        req.user
      );


    return res.status(201).json({

      success: true,

      message:
        result.message,

      data:
        result

    });

  } catch (error) {

    console.error(
      "CREATE ANNOUNCEMENT ERROR:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET ALL
// =========================================================

const getAllAnnouncements = async (
  req,
  res
) => {

  try {

    const data =
      await getAllAnnouncementsService(
        req.user
      );


    return res.status(200).json({

      success: true,

      data

    });

  } catch (error) {

    console.error(
      "GET ANNOUNCEMENTS ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// GET BY ID
// =========================================================

const getAnnouncementById = async (
  req,
  res
) => {

  try {

    const data =
      await getAnnouncementByIdService(
        req.params.id
      );


    return res.status(200).json({

      success: true,

      data

    });

  } catch (error) {

    return res.status(404).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// UPDATE
// =========================================================

const updateAnnouncement = async (
  req,
  res
) => {

  try {

    const result =
      await updateAnnouncementService(
        req.params.id,
        req.body,
        req.user
      );


    return res.status(200).json({

      success: true,

      message:
        result.message

    });

  } catch (error) {

    console.error(
      "UPDATE ANNOUNCEMENT ERROR:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// DELETE
// =========================================================

const deleteAnnouncement = async (
  req,
  res
) => {

  try {

    const result =
      await deleteAnnouncementService(
        req.params.id,
        req.user
      );


    return res.status(200).json({

      success: true,

      message:
        result.message

    });

  } catch (error) {

    console.error(
      "DELETE ANNOUNCEMENT ERROR:",
      error
    );


    return res.status(400).json({

      success: false,

      message:
        error.message

    });

  }

};


// =========================================================
// MY ANNOUNCEMENTS
// =========================================================

const getMyAnnouncements = async (
  req,
  res
) => {

  try {

    const data =
      await getMyAnnouncementsService(
        req.user
      );


    return res.status(200).json({

      success: true,

      data

    });

  } catch (error) {

    console.error(
      "GET MY ANNOUNCEMENTS ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


module.exports = {

  createAnnouncement,

  getAllAnnouncements,

  getAnnouncementById,

  updateAnnouncement,

  deleteAnnouncement,

  getMyAnnouncements

};