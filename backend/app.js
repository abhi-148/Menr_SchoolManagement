const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Routes
const authRoutes = require("./src/routes/authRoutes");

const schoolRoutes = require("./src/routes/schoolRoutes");

const classRoutes = require("./src/routes/classRoutes");

const schoolBranchRoutes = require(
  "./src/routes/schoolBranchRoutes"
);

const schoolClassRoutes = require(
  "./src/routes/schoolClassRoutes"
);
const masterMediumRoutes = require(
  "./src/routes/masterMediumRoutes"
);

const schoolMediumRoutes = require(
  "./src/routes/schoolMediumRoutes"
);

const sectionRoutes = require(
  "./src/routes/sectionRoutes"
);

const subjectRoutes = require(
  "./src/routes/subjectRoutes"
);

const classSubjectRoutes = require(
  "./src/routes/classSubjectRoutes"
);

const teacherSubjectRoutes = require(
  "./src/routes/teacherSubjectRoutes"
);

const staffRoutes = require(
  "./src/routes/staffRoutes"
);

const staffTypeRoutes = require(
  "./src/routes/staffTypeRoutes"
);

const staffDepartmentRoutes = require(
  "./src/routes/staffDepartmentRoutes"
);

const studentRoutes = require(
  "./src/routes/studentRoutes"
);

const timetableRoutes = require(
  "./src/routes/timetableRoutes"
);

const attendanceRoutes = require(
  "./src/routes/attendanceRoutes"
);

const attendanceV2Routes = require(
  "./src/routes/attendanceV2Routes"
);

const feeRoutes = require(
  "./src/routes/feeRoutes"
);

const feeStructureRoutes = require(
  "./src/routes/feeStructureRoutes"
);

const feeStructureComponentRoutes = require("./src/routes/feeStructureComponentRoutes");
const feeInstallmentRoutes = require("./src/routes/feeInstallmentRoutes");
const feeDiscountRoutes = require("./src/routes/feeDiscountRoutes");
const feeConcessionRoutes = require("./src/routes/feeConcessionRoutes");

const studentFeeRoutes = require(
  "./src/routes/studentFeeRoutes"
);

const eventRoutes = require("./src/routes/eventRoutes");
const eventRegistrationRoutes = require(
  "./src/routes/eventRegistrationRoutes"
);

const libraryFinePaymentRoutes = require(
"./src/routes/libraryFinePaymentRoutes"
);

const lostAndFoundRoutes = require(
"./src/routes/lostAndFoundRoutes"
);

const examRoutes = require(
  "./src/routes/examRoutes"
);
const examTimetableRoutes = require(
  "./src/routes/examTimetableRoutes"
);

const studentMarkRoutes = require(
  "./src/routes/studentMarkRoutes"
);

const dashboardRoutes = require(
  "./src/routes/dashboardRoutes"
);

const profileRoutes = require(
  "./src/routes/profileRoutes"
);

const aiRoutes = require(
  "./src/routes/aiRoutes"
);

const reportCardRoutes = require(
  "./src/routes/reportCardRoutes"
);

// Middleware
const errorHandler = require(
  "./src/middlewares/errorHandler"
);

// Academic Year
const academicYearRoutes = require(
  "./src/routes/academicYearRoutes"
);

// Batch
const batchRoutes = require(
  "./src/routes/batchRoutes"
);

// School Period
const schoolPeriodRoutes = require(
  "./src/routes/schoolPeriodRoutes"
);

// Time Table V2
const timeTableV2Routes = require(
  "./src/routes/timeTableV2Routes"
);

// Time Table Substitution
const timeTableSubstitutionRoutes = require(
  "./src/routes/timeTableSubstitutionRoutes"
);

// School Transfer
const schoolTransferRoutes = require(
  "./src/routes/schoolTransferRoutes"
);

const branchTransferRoutes = require(
  "./src/routes/branchTransferRoutes"
);

const admissionInquiryRoutes = require(
  "./src/routes/admissionInquiryRoutes"
);

const achievementRoutes = require(
  "./src/routes/achievementRoutes"
);

const eventPaymentRoutes = require(
  "./src/routes/eventPaymentRoutes"
);

const admissionFollowUpRoutes = require("./src/routes/admissionFollowUpRoutes");
const branchRoutes = require("./src/routes/branchRoutes");

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

// Authentication
app.use("/api/auth", authRoutes);

// School Management
app.use("/api/schools", schoolRoutes);

app.use(
  "/api/school-branches",
  schoolBranchRoutes
);

// Academic Structure
app.use("/api/classes", classRoutes);

app.use(
  "/api/school-classes",
  schoolClassRoutes
);

app.use("/api/sections", sectionRoutes);

app.use("/api/subjects", subjectRoutes);

app.use(
  "/api/class-subjects",
  classSubjectRoutes
);

app.use(
  "/api/teacher-subjects",
  teacherSubjectRoutes
);

// Staff
app.use("/api/staff", staffRoutes);

app.use(
  "/api/staff-types",
  staffTypeRoutes
);

app.use(
  "/api/staff-departments",
  staffDepartmentRoutes
);

// Students
app.use("/api/students", studentRoutes);

// School Transfers
app.use(
  "/api/school-transfers",
  schoolTransferRoutes
);

app.use(
  "/api/branch-transfers",
  branchTransferRoutes
);

// Attendance
app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/attendance-v2",
  attendanceV2Routes
);

// Fees
app.use("/api/fees", feeRoutes);

app.use(
  "/api/fee-structures",
  feeStructureRoutes
);


app.use(
  "/api/fee-structure-components",
  feeStructureComponentRoutes
);

app.use("/api/fee-installments", feeInstallmentRoutes);

app.use(
  "/api/student-fees",
  studentFeeRoutes
);

app.use("/api/fee-discounts", feeDiscountRoutes);

app.use("/api/fee-concessions", feeConcessionRoutes);

app.use(
"/api/library-fine-payments",
libraryFinePaymentRoutes
);

app.use(
"/api/lost-and-found",
lostAndFoundRoutes
);

// Exams
app.use("/api/exams", examRoutes);

app.use(
  "/api/student-marks",
  studentMarkRoutes
);
app.use(
  "/api/exam-timetable",
  examTimetableRoutes
);

app.use("/api/events", eventRoutes);

app.use(
  "/api/event-registrations",
  eventRegistrationRoutes
);
app.use(
  "/api/event-payments",
  eventPaymentRoutes
);

app.use(
  "/api/report-cards",
  reportCardRoutes
);

// Timetable
app.use(
  "/api/timetables",
  timetableRoutes
);

app.use(
  "/api/master-mediums",
  masterMediumRoutes
);

app.use(
  "/api/school-mediums",
  schoolMediumRoutes
);

// Academic Years
app.use(
  "/api/academic-years",
  academicYearRoutes
);

// Batches
app.use(
  "/api/batches",
  batchRoutes
);

// School Periods
app.use(
  "/api/school-periods",
  schoolPeriodRoutes
);

// Timetable V2
app.use(
  "/api/timetable-v2",
  timeTableV2Routes
);

// Timetable Substitutions
app.use(
  "/api/timetable-substitutions",
  timeTableSubstitutionRoutes
);

// Dashboard
app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use("/api/branches", branchRoutes);

// Profile
app.use(
  "/api/profile",
  profileRoutes
);


app.use(
  "/api/admission-inquiries",
  admissionInquiryRoutes
);

app.use(
  "/api/achievements",
  achievementRoutes
);

app.use(
    "/api/admission-follow-ups",
    admissionFollowUpRoutes
);


// AI
app.use("/api/ai", aiRoutes);

// Error Handler (Always Last)
app.use(errorHandler);


module.exports = app;