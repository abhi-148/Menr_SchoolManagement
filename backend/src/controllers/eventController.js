const {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} = require("../services/eventService");

// =======================================
// Create Event
// =======================================
const createEvent = async (req, res) => {
  try {

    let schoolId;

    // SUPER ADMIN
    if (req.user.role === "SUPER_ADMIN") {

      schoolId = req.body.school_id;

      if (!schoolId) {
        return res.status(400).json({
          success: false,
          message: "School is required.",
        });
      }

    }

    // SCHOOL ADMIN
    else {

      schoolId =
        req.user.schoolId ||
        req.user.school_id;

      if (!schoolId) {
        return res.status(400).json({
          success: false,
          message: "School not found in token.",
        });
      }

    }
const result =
  await createEventService({

    ...req.body,

    school_id: schoolId,

    created_by: req.user.id,

    cover_image: req.file
      ? `/uploads/events/${req.file.filename}`
      : null,

  });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: result,
    });

  } catch (error) {

    console.log("========== EVENT ERROR ==========");

    console.log(error);

    console.log("MESSAGE =>", error.message);

    console.log("SQL MESSAGE =>", error.sqlMessage);

    console.log("SQL CODE =>", error.code);

    console.log("SQL ERRNO =>", error.errno);

    console.log("STACK =>");

    console.log(error.stack);

    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage || null,
      sqlCode: error.code || null,
      sqlErrno: error.errno || null,
    });

  }
};

// =======================================
// Get All Events
// =======================================
const getAllEvents = async (req, res) => {

  try {

    const {
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    const events =
      await getAllEventsService(
        search,
        page,
        limit
      );

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================================
// Get Event By ID
// =======================================
const getEventById = async (req, res) => {

  try {

    const event =
      await getEventByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: event,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================================
// Update Event
// =======================================
const updateEvent = async (req, res) => {

  try {

    await updateEventService(
  req.params.id,
  {

    ...req.body,

    updated_by: req.user.id,

    ...(req.file && {
      cover_image: `/uploads/events/${req.file.filename}`,
    }),

  }
);
    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// =======================================
// Delete Event
// =======================================
const deleteEvent = async (req, res) => {

  try {

    await deleteEventService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};