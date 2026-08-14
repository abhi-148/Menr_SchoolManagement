const {
  getStudentCount,
  getStaffCount,
  getAttendanceSummary,
  getAbsentStudents,
  getPendingFees,
  getRecentMarks,
  getSubjects,
  getRecentAnnouncements
} = require(
  "../repositories/aiRepository"
);


const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";


// =========================================================
// DETECT DATABASE TOOL
// =========================================================

const detectTool = (
  message
) => {

  const text =
    message
      .toLowerCase()
      .trim();


  if (
    text.includes("student") &&
    (
      text.includes("how many") ||
      text.includes("count") ||
      text.includes("total")
    )
  ) {

    return "STUDENT_COUNT";

  }


  if (
    text.includes("staff") &&
    (
      text.includes("how many") ||
      text.includes("count") ||
      text.includes("total")
    )
  ) {

    return "STAFF_COUNT";

  }


  if (
    (
      text.includes("attendance") ||
      text.includes("present") ||
      text.includes("absent")
    ) &&
    (
      text.includes("today") ||
      text.includes("attendance")
    )
  ) {

    if (
      text.includes("absent")
    ) {

      return "ABSENT_STUDENTS";

    }

    return "ATTENDANCE_SUMMARY";

  }


  if (
    text.includes("fee") ||
    text.includes("fees") ||
    text.includes("pending fee") ||
    text.includes("unpaid")
  ) {

    return "PENDING_FEES";

  }


  if (
    text.includes("result") ||
    text.includes("marks") ||
    text.includes("score")
  ) {

    return "RECENT_MARKS";

  }


  if (
    text.includes("subject") ||
    text.includes("subjects")
  ) {

    return "SUBJECTS";

  }


  if (
    text.includes("announcement") ||
    text.includes("announcements") ||
    text.includes("notice") ||
    text.includes("notices")
  ) {

    return "ANNOUNCEMENTS";

  }


  return null;

};


// =========================================================
// RUN DATABASE TOOL
// =========================================================

const runDatabaseTool = async (
  tool,
  user
) => {

  const schoolId =
    user?.role === "SUPER_ADMIN"
      ? null
      : user?.schoolId;


  switch (tool) {

    case "STUDENT_COUNT":

      return {
        tool,
        data:
          await getStudentCount(
            schoolId
          )
      };


    case "STAFF_COUNT":

      return {
        tool,
        data:
          await getStaffCount(
            schoolId
          )
      };


    case "ATTENDANCE_SUMMARY":

      return {
        tool,
        data:
          await getAttendanceSummary(
            schoolId
          )
      };


    case "ABSENT_STUDENTS":

      return {
        tool,
        data:
          await getAbsentStudents(
            schoolId
          )
      };


    case "PENDING_FEES":

      return {
        tool,
        data:
          await getPendingFees(
            schoolId
          )
      };


    case "RECENT_MARKS":

      return {
        tool,
        data:
          await getRecentMarks(
            schoolId
          )
      };


    case "SUBJECTS":

      return {
        tool,
        data:
          await getSubjects()
      };


    case "ANNOUNCEMENTS":

      return {
        tool,
        data:
          await getRecentAnnouncements(
            schoolId
          )
      };


    default:

      return null;

  }

};


// =========================================================
// ASK AI
// =========================================================

const askAIService = async (
  message,
  user
) => {

  if (
    !message ||
    !message.trim()
  ) {

    throw new Error(
      "Message is required."
    );

  }


  if (
    !process.env.OPENROUTER_API_KEY
  ) {

    throw new Error(
      "OpenRouter API key is not configured."
    );

  }


  const model =
    process.env.OPENROUTER_MODEL ||
    "openrouter/free";


  const tool =
    detectTool(
      message
    );


  let databaseContext =
    null;


  // Only use database tools
  // for authenticated users.

  if (
    tool &&
    user
  ) {

    databaseContext =
      await runDatabaseTool(
        tool,
        user
      );

  }


  const systemPrompt = `
You are SchoolMS AI Assistant.

User Role:
${user?.role || "USER"}

Rules:

1. Give accurate and useful answers.
2. Never invent database information.
3. When DATABASE DATA is provided below,
   use only that data for factual school records.
4. Do not expose SQL queries.
5. Do not expose database credentials.
6. Do not claim database access when no data is provided.
7. Keep answers concise and professional.
8. If the user asks something unrelated to school management,
   answer normally.

DATABASE DATA:
${
  databaseContext
    ? JSON.stringify(
        databaseContext,
        null,
        2
      )
    : "No database tool was used."
}
`;


  const response =
    await fetch(
      OPENROUTER_URL,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "HTTP-Referer":
            process.env.FRONTEND_URL ||
            "http://localhost:5173",

          "X-Title":
            "School Management System"

        },

        body:
          JSON.stringify({

            model,

            messages: [

              {
                role:
                  "system",

                content:
                  systemPrompt
              },

              {
                role:
                  "user",

                content:
                  message.trim()
              }

            ]

          })

      }
    );


  const data =
    await response.json();


  if (
    !response.ok
  ) {

    console.error(
      "OPENROUTER ERROR:",
      data
    );

    throw new Error(
      data?.error?.message ||
      "OpenRouter request failed."
    );

  }


  const answer =
    data
      ?.choices?.[0]
      ?.message
      ?.content;


  if (!answer) {

    throw new Error(
      "No AI response received."
    );

  }


  return {

    answer,

    model:
      data.model ||
      model,

    tool:
      tool || null

  };

};


module.exports = {
  askAIService
};