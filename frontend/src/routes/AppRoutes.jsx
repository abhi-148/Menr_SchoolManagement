import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";
import Schools from "../pages/Schools/Schools";
import Staff from "../pages/Staff/Staff";
import StaffType from "../pages/StaffType/StaffType";
import StaffDepartment from "../pages/StaffDepartment/StaffDepartment";
import Students from "../pages/Students/Students";
import Attendance from "../pages/Attendance/Attendance";
import Fees from "../pages/Fees/Fees";
import Profile from "../pages/Profile/Profile";
import AIAssistant from "../pages/AI/AIAssistant";
import FeeStructure from "../pages/FeeStructure/FeeStructure";
import StudentFeeCollection from "../pages/StudentFeeCollection/StudentFeeCollection";
import FeeStructureComponents from "../pages/FeeStructureComponents/FeeStructureComponents";
import FeeInstallments from "../pages/FeeInstallments/FeeInstallments";
import FeeDiscounts from "../pages/FeeDiscounts/FeeDiscounts";
import FeeConcessions from "../pages/FeeConcessions/FeeConcessions";
import Exams from "../pages/Exams/Exams";
import StudentMarks from "../pages/StudentMarks/StudentMarks";
import Timetable from "../pages/Timetable/Timetable";
import ReportCard from "../pages/ReportCard/ReportCard";
import Classes from "../pages/Classes/Classes";
import SchoolBranches from "../pages/SchoolBranches/SchoolBranches";
import SchoolClasses from "../pages/SchoolClasses/SchoolClasses";
import MasterMediumPage from "../pages/mediums/MasterMediumPage";
import SchoolMediumPage from "../pages/mediums/SchoolMediumPage";
import Batch from "../pages/Batch/Batch";
import AddBatch from "../pages/Batch/AddBatch";
import EditBatch from "../pages/Batch/EditBatch";
import ViewBatch from "../pages/Batch/ViewBatch";
import ExamTimetable from "../pages/ExamTimetable/ExamTimetable";
import AddExamTimetable from "../pages/ExamTimetable/AddExamTimetable";
import EditExamTimetable from "../pages/ExamTimetable/EditExamTimetable";
import ViewExamTimetable from "../pages/ExamTimetable/ViewExamTimetable";
import SchoolPeriod from "../pages/SchoolPeriod/SchoolPeriod";
import AddSchoolPeriod from "../pages/SchoolPeriod/AddSchoolPeriod";
import EditSchoolPeriod from "../pages/SchoolPeriod/EditSchoolPeriod";
import ViewSchoolPeriod from "../pages/SchoolPeriod/ViewSchoolPeriod";
import AddTimetable from "../pages/Timetable/AddTimetable";
import EditTimetable from "../pages/Timetable/EditTimetable";
import ViewTimetable from "../pages/Timetable/ViewTimetable";
import TimeTableSubstitution from "../pages/TimeTableSubstitution/TimeTableSubstitution";
import AddTimeTableSubstitution from "../pages/TimeTableSubstitution/AddTimeTableSubstitution";
import EditTimeTableSubstitution from "../pages/TimeTableSubstitution/EditTimeTableSubstitution";
import ViewTimeTableSubstitution from "../pages/TimeTableSubstitution/ViewTimeTableSubstitution";
import SchoolTransfer from "../pages/SchoolTransfer/SchoolTransfer";
import BranchTransfer from "../pages/BranchTransfer/BranchTransfer";
import LibraryFinePayment from "../pages/LibraryFinePayment/LibraryFinePayment";
import AddLibraryFinePayment from "../pages/LibraryFinePayment/AddLibraryFinePayment";
import EditLibraryFinePayment from "../pages/LibraryFinePayment/EditLibraryFinePayment";
import ViewLibraryFinePayment from "../pages/LibraryFinePayment/ViewLibraryFinePayment";
import LostAndFound from "../pages/LostAndFound/LostAndFound";
import AddLostAndFound from "../pages/LostAndFound/AddLostAndFound";
import EditLostAndFound from "../pages/LostAndFound/EditLostAndFound";
import ViewLostAndFound from "../pages/LostAndFound/ViewLostAndFound";
import AcademicYears from "../pages/academicYears/AcademicYears";
import AdmissionInquiry from "../pages/admissionInquiry/AdmissionInquiry";
import AdmissionFollowUp from "../pages/admissionFollowUp/AdmissionFollowUp";
import Achievement from "../pages/achievement/Achievement";

import PrivateRoute from "./PrivateRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/schools"
          element={
            <PrivateRoute>
              <Schools />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff-types"
          element={
            <PrivateRoute>
              <StaffType />
            </PrivateRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <StaffDepartment />
            </PrivateRoute>
          }
        />

        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Students />
            </PrivateRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <PrivateRoute>
              <Fees />
            </PrivateRoute>
          }
        />

        <Route
  path="/library-fine-payments"
  element={
    <PrivateRoute>
      <LibraryFinePayment />
    </PrivateRoute>
  }
/>

<Route
  path="/library-fine-payments/add"
  element={
    <PrivateRoute>
      <AddLibraryFinePayment />
    </PrivateRoute>
  }
/>

<Route
  path="/library-fine-payments/edit/:id"
  element={
    <PrivateRoute>
      <EditLibraryFinePayment />
    </PrivateRoute>
  }
/>

<Route
  path="/library-fine-payments/view/:id"
  element={
    <PrivateRoute>
      <ViewLibraryFinePayment />
    </PrivateRoute>
  }
/>

<Route
  path="/lost-and-found"
  element={
    <PrivateRoute>
      <LostAndFound />
    </PrivateRoute>
  }
/>

<Route
  path="/lost-and-found/add"
  element={
    <PrivateRoute>
      <AddLostAndFound />
    </PrivateRoute>
  }
/>

<Route
  path="/lost-and-found/edit/:id"
  element={
    <PrivateRoute>
      <EditLostAndFound />
    </PrivateRoute>
  }
/>

<Route
  path="/lost-and-found/view/:id"
  element={
    <PrivateRoute>
      <ViewLostAndFound />
    </PrivateRoute>
  }
/>

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
  path="/fee-structure"
  element={
    <PrivateRoute>
      <FeeStructure />
    </PrivateRoute>
  }
/>

<Route
  path="/fee-structure-components"
  element={
    <PrivateRoute>
      <FeeStructureComponents />
    </PrivateRoute>
  }
/>

<Route
  path="/fee-installments"
  element={
    <PrivateRoute>
      <FeeInstallments />
    </PrivateRoute>
  }
/>

<Route
  path="/fee-discounts"
  element={<FeeDiscounts />}
/>

<Route
  path="/fee-concessions"
  element={<FeeConcessions />}
/>

<Route
  path="/student-fees"
  element={
    <PrivateRoute>
      <StudentFeeCollection />
    </PrivateRoute>
  }
/>

<Route
  path="/exams"
  element={
    <PrivateRoute>
      <Exams />
    </PrivateRoute>
  }
/>

<Route
  path="/student-marks"
  element={
    <PrivateRoute>
      <StudentMarks />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable"
  element={
    <PrivateRoute>
      <Timetable />
    </PrivateRoute>
  }
/>
<Route
  path="/timetable/add"
  element={
    <PrivateRoute>
      <AddTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable/edit/:id"
  element={
    <PrivateRoute>
      <EditTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable/view/:id"
  element={
    <PrivateRoute>
      <ViewTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/report-card"
  element={
    <PrivateRoute>
      <ReportCard />
    </PrivateRoute>
  }
/>

        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <AIAssistant />
            </PrivateRoute>
          }
        />
      <Route
  path="/classes"
  element={
    <PrivateRoute>
      <Classes />
    </PrivateRoute>
  }
/>

<Route
  path="/school-branches"
  element={
    <PrivateRoute>
      <SchoolBranches />
    </PrivateRoute>
  }
/>

<Route
  path="/school-classes"
  element={
    <PrivateRoute>
      <SchoolClasses />
    </PrivateRoute>
  }
/>

<Route
  path="/master-mediums"
  element={
    <PrivateRoute>
      <MasterMediumPage />
    </PrivateRoute>
  }
/>

<Route
  path="/school-mediums"
  element={
    <PrivateRoute>
      <SchoolMediumPage />
    </PrivateRoute>
  }
/><Route
  path="/batches"
  element={
    <PrivateRoute>
      <Batch />
    </PrivateRoute>
  }
/>

<Route
  path="/batches/add"
  element={
    <PrivateRoute>
      <AddBatch />
    </PrivateRoute>
  }
/>

<Route
  path="/batches/edit/:id"
  element={
    <PrivateRoute>
      <EditBatch />
    </PrivateRoute>
  }
/>

<Route
  path="/batches/view/:id"
  element={
    <PrivateRoute>
      <ViewBatch />
    </PrivateRoute>
  }
/>

<Route
  path="/exam-timetable"
  element={
    <PrivateRoute>
      <ExamTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/exam-timetable/add"
  element={
    <PrivateRoute>
      <AddExamTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/exam-timetable/edit/:id"
  element={
    <PrivateRoute>
      <EditExamTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/exam-timetable/view/:id"
  element={
    <PrivateRoute>
      <ViewExamTimetable />
    </PrivateRoute>
  }
/>

<Route
  path="/school-periods"
  element={
    <PrivateRoute>
      <SchoolPeriod />
    </PrivateRoute>
  }
/>

<Route
  path="/school-periods/add"
  element={
    <PrivateRoute>
      <AddSchoolPeriod />
    </PrivateRoute>
  }
/>

<Route
  path="/school-periods/edit/:id"
  element={
    <PrivateRoute>
      <EditSchoolPeriod />
    </PrivateRoute>
  }
/>

<Route
  path="/school-periods/view/:id"
  element={
    <PrivateRoute>
      <ViewSchoolPeriod />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable-substitutions"
  element={
    <PrivateRoute>
      <TimeTableSubstitution />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable-substitutions/add"
  element={
    <PrivateRoute>
      <AddTimeTableSubstitution />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable-substitutions/edit/:id"
  element={
    <PrivateRoute>
      <EditTimeTableSubstitution />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable-substitutions/view/:id"
  element={
    <PrivateRoute>
      <ViewTimeTableSubstitution />
    </PrivateRoute>
  }
/>

<Route
  path="/school-transfers"
  element={
    <PrivateRoute>
      <SchoolTransfer />
    </PrivateRoute>
  }
/>

<Route
  path="/branch-transfers"
  element={
    <PrivateRoute>
      <BranchTransfer />
    </PrivateRoute>
  }
/>

<Route
  path="/academic-years"
  element={
    <PrivateRoute>
      <AcademicYears />
    </PrivateRoute>
  }
/>

<Route
  path="/admission-inquiry"
  element={
    <PrivateRoute>
      <AdmissionInquiry />
    </PrivateRoute>
  }
/>

<Route
  path="/admission-follow-up"
  element={
    <PrivateRoute>
      <AdmissionFollowUp />
    </PrivateRoute>
  }
/>

<Route
  path="/achievement"
  element={
    <PrivateRoute>
      <Achievement />
    </PrivateRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );

}

export default AppRoutes;