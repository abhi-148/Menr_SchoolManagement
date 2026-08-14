const pool = require("../config/db");


// =========================================================
// CREATE ANNOUNCEMENT
// =========================================================

const createAnnouncement = async (data) => {

  const [result] = await pool.query(
    `
    INSERT INTO announcements
    (
      school_id,
      created_by,
      title,
      description,
      audience,
      priority,
      publish_at,
      expires_at,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.school_id,
      data.created_by,
      data.title,
      data.description,
      data.audience,
      data.priority,
      data.publish_at,
      data.expires_at || null,
      data.status
    ]
  );

  return result;
};


// =========================================================
// GET ALL ANNOUNCEMENTS
// =========================================================

const getAllAnnouncements = async (user) => {

  let query = `
    SELECT
      a.id,
      a.school_id,
      a.created_by,
      a.title,
      a.description,
      a.audience,
      a.priority,
      a.publish_at,
      a.expires_at,
      a.status,
      a.created_at,
      a.updated_at,

      CASE
        WHEN sa.id IS NOT NULL
        THEN sa.full_name

        WHEN st.id IS NOT NULL
        THEN st.full_name

        ELSE 'User'
      END AS creator_name

    FROM announcements a

    LEFT JOIN super_admin sa
      ON a.created_by = sa.id

    LEFT JOIN staff st
      ON a.created_by = st.id
      AND a.school_id = st.school_id
  `;

  const params = [];

  // School admin only sees own school.
  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    query += `
      WHERE a.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }

  query += `
    ORDER BY
      a.id DESC
  `;


  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


// =========================================================
// GET ANNOUNCEMENT BY ID
// =========================================================

const getAnnouncementById = async (
  id
) => {

  const [rows] =
    await pool.query(
      `
      SELECT
        a.id,
        a.school_id,
        a.created_by,
        a.title,
        a.description,
        a.audience,
        a.priority,
        a.publish_at,
        a.expires_at,
        a.status,
        a.created_at,
        a.updated_at
      FROM announcements a
      WHERE a.id = ?
      LIMIT 1
      `,
      [id]
    );

  return rows[0];
};


// =========================================================
// UPDATE ANNOUNCEMENT
// =========================================================

const updateAnnouncement = async (
  id,
  data
) => {

  const [result] =
    await pool.query(
      `
      UPDATE announcements
      SET
        title = ?,
        description = ?,
        audience = ?,
        priority = ?,
        publish_at = ?,
        expires_at = ?,
        status = ?
      WHERE id = ?
      `,
      [
        data.title,
        data.description,
        data.audience,
        data.priority,
        data.publish_at,
        data.expires_at || null,
        data.status,
        id
      ]
    );

  return result;
};


// =========================================================
// DELETE ANNOUNCEMENT
// =========================================================

const deleteAnnouncement = async (
  id
) => {

  const [result] =
    await pool.query(
      `
      DELETE FROM announcements
      WHERE id = ?
      `,
      [id]
    );

  return result;
};


// =========================================================
// GET MY ANNOUNCEMENTS
// =========================================================

const getMyAnnouncements = async (
  user
) => {

  let query = `
    SELECT
      a.id,
      a.school_id,
      a.created_by,
      a.title,
      a.description,
      a.audience,
      a.priority,
      a.publish_at,
      a.expires_at,
      a.status,
      a.created_at,
      a.updated_at

    FROM announcements a

    WHERE
      a.status = 'PUBLISHED'

      AND a.publish_at <= NOW()

      AND (
        a.expires_at IS NULL
        OR a.expires_at >= NOW()
      )
  `;

  const params = [];


  // =======================================================
  // SCHOOL FILTER
  // =======================================================

  if (
    user.role !== "SUPER_ADMIN"
  ) {

    query += `
      AND a.school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }


  // =======================================================
  // AUDIENCE FILTER
  // =======================================================

  if (
    user.role === "STUDENT"
  ) {

    query += `
      AND (
        a.audience = 'ALL'
        OR a.audience = 'STUDENTS'
      )
    `;

  }

  else if (
    user.role === "STAFF"
  ) {

    query += `
      AND (
        a.audience = 'ALL'
        OR a.audience = 'STAFF'
      )
    `;

  }


  query += `
    ORDER BY
      CASE
        WHEN a.priority = 'HIGH'
        THEN 1
        WHEN a.priority = 'NORMAL'
        THEN 2
        ELSE 3
      END,

      a.publish_at DESC
  `;


  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;
};


module.exports = {

  createAnnouncement,

  getAllAnnouncements,

  getAnnouncementById,

  updateAnnouncement,

  deleteAnnouncement,

  getMyAnnouncements

};