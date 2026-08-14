import {
  useContext,
  useEffect,
  useState
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Send,
  CalendarDays,
  Users,
  AlertCircle
} from "lucide-react";

import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from "../../services/announcementService";

import {
  AuthContext
} from "../../context/AuthContext";


function Announcement() {

  const {
    role
  } = useContext(AuthContext);


  const [announcements, setAnnouncements] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [error, setError] =
    useState("");


  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      audience: "ALL",

      priority: "NORMAL",

      publish_at: "",

      expires_at: "",

      status: "PUBLISHED"

    });


  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {

    loadAnnouncements();

  }, []);


  const loadAnnouncements = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getAnnouncements();

      setAnnouncements(
        response?.data || []
      );

    } catch (err) {

      console.error(
        "GET ANNOUNCEMENTS ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load announcements"
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {

    setFormData({

      title: "",

      description: "",

      audience: "ALL",

      priority: "NORMAL",

      publish_at: "",

      expires_at: "",

      status: "PUBLISHED"

    });

    setEditing(null);
    setShowForm(false);

  };


  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {

      alert(
        "Title and description are required."
      );

      return;

    }


    try {

      setSaving(true);


      const payload = {

        ...formData,

        publish_at:
          formData.publish_at ||
          null,

        expires_at:
          formData.expires_at ||
          null

      };


      if (editing) {

        await updateAnnouncement(
          editing.id,
          payload
        );

        alert(
          "Announcement Updated Successfully"
        );

      } else {

        await createAnnouncement(
          payload
        );

        alert(
          "Announcement Created Successfully"
        );

      }


      resetForm();

      await loadAnnouncements();

    } catch (err) {

      console.error(
        "SAVE ANNOUNCEMENT ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to save announcement"
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (item) => {

    setEditing(item);

    setFormData({

      title:
        item.title || "",

      description:
        item.description || "",

      audience:
        item.audience || "ALL",

      priority:
        item.priority || "NORMAL",

      publish_at:
        item.publish_at
          ? formatDateTimeLocal(
              item.publish_at
            )
          : "",

      expires_at:
        item.expires_at
          ? formatDateTimeLocal(
              item.expires_at
            )
          : "",

      status:
        item.status || "PUBLISHED"

    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Delete this announcement?"
      );


    if (!confirmed) {
      return;
    }


    try {

      await deleteAnnouncement(
        id
      );

      alert(
        "Announcement Deleted Successfully"
      );

      await loadAnnouncements();

    } catch (err) {

      console.error(
        "DELETE ANNOUNCEMENT ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete announcement"
      );

    }

  };


  const canManage =
    role === "SUPER_ADMIN" ||
    role === "SCHOOL_ADMIN";


  return (

    <AdminLayout>

      <div className="
        min-h-screen
        bg-slate-100
        p-6
        md:p-8
      ">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        ">

          <div>

            <div className="
              flex
              items-center
              gap-2
              text-blue-600
              text-sm
              font-medium
              mb-2
            ">

              <Bell size={17} />

              Communication

            </div>


            <h1 className="
              text-3xl
              font-bold
              text-slate-900
            ">
              Announcements
            </h1>


            <p className="
              text-slate-500
              mt-1
            ">
              Manage important school announcements and updates.
            </p>

          </div>


          <div className="
            flex
            gap-3
          ">

            <button
              onClick={loadAnnouncements}
              className="
                inline-flex
                items-center
                gap-2
                bg-white
                border
                border-slate-200
                text-slate-700
                px-4
                py-2.5
                rounded-xl
                hover:bg-slate-50
              "
            >

              <RefreshCw size={17} />

              Refresh

            </button>


            {canManage && (

              <button
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  font-medium
                "
              >

                <Plus size={18} />

                New Announcement

              </button>

            )}

          </div>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (

          <div className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-700
            rounded-xl
            p-4
            flex
            items-start
            gap-3
          ">

            <AlertCircle
              size={20}
              className="mt-0.5"
            />

            <div>

              <p className="font-medium">
                Unable to load announcements
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>

          </div>

        )}


        {/* ===================================================
            FORM
        =================================================== */}

        {showForm && canManage && (

          <div className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-slate-100
            p-6
            mb-8
          ">

            <div className="
              flex
              items-center
              justify-between
              mb-6
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">

                  {editing
                    ? "Update Announcement"
                    : "Create Announcement"}

                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Publish an important update to your school community.
                </p>

              </div>


              <button
                onClick={resetForm}
                className="
                  text-slate-400
                  hover:text-slate-700
                "
              >

                <X size={21} />

              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* Title */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter announcement title"
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                  required
                />

              </div>


              {/* Description */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write announcement details..."
                  rows="5"
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                  required
                />

              </div>


              {/* Controls */}

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-4
              ">


                {/* Audience */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                    mb-2
                  ">
                    Audience
                  </label>

                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      bg-white
                    "
                  >

                    <option value="ALL">
                      Everyone
                    </option>

                    <option value="STAFF">
                      Staff Only
                    </option>

                    <option value="STUDENTS">
                      Students Only
                    </option>

                  </select>

                </div>


                {/* Priority */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                    mb-2
                  ">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      bg-white
                    "
                  >

                    <option value="LOW">
                      Low
                    </option>

                    <option value="NORMAL">
                      Normal
                    </option>

                    <option value="HIGH">
                      High
                    </option>

                  </select>

                </div>


                {/* Publish */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                    mb-2
                  ">
                    Publish At
                  </label>

                  <input
                    type="datetime-local"
                    name="publish_at"
                    value={formData.publish_at}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                    "
                  />

                </div>


                {/* Expiry */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                    mb-2
                  ">
                    Expires At
                  </label>

                  <input
                    type="datetime-local"
                    name="expires_at"
                    value={formData.expires_at}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                    "
                  />

                </div>

              </div>


              {/* Status */}

              <div className="max-w-xs">

                <label className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                ">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                  "
                >

                  <option value="DRAFT">
                    Draft
                  </option>

                  <option value="PUBLISHED">
                    Published
                  </option>

                </select>

              </div>


              {/* Buttons */}

              <div className="
                flex
                gap-3
                pt-2
              ">

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-blue-400
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                  "
                >

                  {saving ? (

                    <>
                      <RefreshCw
                        size={18}
                        className="animate-spin"
                      />

                      Saving...

                    </>

                  ) : (

                    <>
                      <Send size={18} />

                      {editing
                        ? "Update Announcement"
                        : "Publish Announcement"}

                    </>

                  )}

                </button>


                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    bg-slate-100
                    hover:bg-slate-200
                    text-slate-700
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        )}


        {/* ===================================================
            LIST
        =================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-slate-100
          overflow-hidden
        ">


          <div className="
            px-6
            py-5
            border-b
            border-slate-100
            flex
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-xl
                font-bold
                text-slate-800
              ">
                All Announcements
              </h2>

              <p className="
                text-sm
                text-slate-500
                mt-1
              ">
                {announcements.length} announcement
                {announcements.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>


            <Bell
              size={21}
              className="text-blue-600"
            />

          </div>


          {loading ? (

            <div className="
              py-16
              text-center
            ">

              <RefreshCw
                size={28}
                className="
                  mx-auto
                  text-blue-600
                  animate-spin
                "
              />

              <p className="
                text-slate-500
                mt-3
              ">
                Loading announcements...
              </p>

            </div>

          ) : announcements.length === 0 ? (

            <div className="
              py-16
              text-center
            ">

              <div className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              ">

                <Bell size={26} />

              </div>

              <h3 className="
                mt-4
                font-semibold
                text-slate-800
              ">
                No announcements yet
              </h3>

              <p className="
                text-sm
                text-slate-500
                mt-1
              ">
                Create your first announcement to get started.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {announcements.map(
                (item) => (

                  <AnnouncementCard
                    key={item.id}
                    item={item}
                    canManage={canManage}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

    </AdminLayout>

  );

}


// =========================================================
// CARD
// =========================================================

function AnnouncementCard({
  item,
  canManage,
  onEdit,
  onDelete
}) {

  const priorityClass =
    item.priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : item.priority === "LOW"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-100 text-blue-700";


  const statusClass =
    item.status === "PUBLISHED"
      ? "bg-green-100 text-green-700"
      : item.status === "EXPIRED"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";


  return (

    <div className="
      p-6
      hover:bg-slate-50
      transition
    ">

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-start
        lg:justify-between
        gap-5
      ">


        <div className="flex-1">

          <div className="
            flex
            flex-wrap
            items-center
            gap-2
            mb-3
          ">

            <span className={`
              px-2.5
              py-1
              rounded-full
              text-xs
              font-medium
              ${priorityClass}
            `}>
              {item.priority}
            </span>


            <span className={`
              px-2.5
              py-1
              rounded-full
              text-xs
              font-medium
              ${statusClass}
            `}>
              {item.status}
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              text-xs
              font-medium
              bg-purple-100
              text-purple-700
            ">

              {item.audience === "ALL"
                ? "Everyone"
                : item.audience}

            </span>

          </div>


          <h3 className="
            text-lg
            font-bold
            text-slate-800
          ">
            {item.title}
          </h3>


          <p className="
            text-slate-600
            text-sm
            leading-6
            mt-2
            whitespace-pre-line
          ">
            {item.description}
          </p>


          <div className="
            flex
            flex-wrap
            gap-4
            text-xs
            text-slate-500
            mt-4
          ">

            <span className="
              inline-flex
              items-center
              gap-1
            ">

              <CalendarDays size={14} />

              {formatDate(
                item.publish_at
              )}

            </span>


            <span className="
              inline-flex
              items-center
              gap-1
            ">

              <Users size={14} />

              {item.audience === "ALL"
                ? "Everyone"
                : item.audience}

            </span>

          </div>

        </div>


        {canManage && (

          <div className="
            flex
            gap-2
          ">

            <button
              onClick={() =>
                onEdit(item)
              }
              className="
                inline-flex
                items-center
                gap-1.5
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                px-3
                py-2
                rounded-lg
                text-sm
              "
            >

              <Pencil size={15} />

              Edit

            </button>


            <button
              onClick={() =>
                onDelete(item.id)
              }
              className="
                inline-flex
                items-center
                gap-1.5
                bg-red-600
                hover:bg-red-700
                text-white
                px-3
                py-2
                rounded-lg
                text-sm
              "
            >

              <Trash2 size={15} />

              Delete

            </button>

          </div>

        )}

      </div>

    </div>

  );

}


// =========================================================
// DATE
// =========================================================

function formatDate(value) {

  if (!value) {
    return "-";
  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return String(value);

  }


  return date.toLocaleString();

}


// =========================================================
// DATETIME LOCAL
// =========================================================

function formatDateTimeLocal(
  value
) {

  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  const pad = (num) =>
    String(num).padStart(2, "0");


  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(
    date.getDate()
  )}T${pad(
    date.getHours()
  )}:${pad(
    date.getMinutes()
  )}`;

}


export default Announcement;