import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  ClipboardCheck,
  IndianRupee,
  CalendarDays,
  BookOpen,
  ShieldCheck,
  BarChart3,
  Clock3,
  Sparkles
} from "lucide-react";

function Welcome() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                <GraduationCap size={24} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  SchoolMS
                </h1>

                <p className="text-[11px] text-slate-500">
                  School Management System
                </p>
              </div>

            </Link>


            {/* Navigation */}

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">

              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 transition"
              >
                Features
              </a>

              <a
                href="#modules"
                className="text-slate-600 hover:text-blue-600 transition"
              >
                Modules
              </a>

              <a
                href="#why-us"
                className="text-slate-600 hover:text-blue-600 transition"
              >
                Why SchoolMS
              </a>

            </div>


            {/* Login */}

            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition"
            >
              Login
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Background blobs */}

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />

        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />


        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">


            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">

                <Sparkles size={16} />

                Smart School Management Platform

              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-slate-900">

                Manage Your School

                <span className="block text-blue-600 mt-2">
                  Smarter. Faster. Better.
                </span>

              </h1>


              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">

                A complete digital platform to manage students,
                staff, attendance, academics, fees, events,
                reports and everyday school operations from one place.

              </p>


              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-xl shadow-blue-600/20 transition"
                >
                  Get Started

                  <ArrowRight size={18} />

                </Link>


                <a
                  href="#features"
                  className="inline-flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition"
                >
                  Explore Features
                </a>

              </div>


              {/* Trust points */}

              <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-xl">

                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <CheckCircle2
                    size={18}
                    className="text-green-500"
                  />

                  Easy to Manage

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <ShieldCheck
                    size={18}
                    className="text-green-500"
                  />

                  Role Based Access

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <BarChart3
                    size={18}
                    className="text-green-500"
                  />

                  Smart Insights

                </div>

              </div>

            </div>


            {/* RIGHT - DASHBOARD PREVIEW */}

            <div className="relative">

              <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />

              <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 sm:p-6">


                {/* Dashboard Header */}

                <div className="flex items-center justify-between mb-6">

                  <div>

                    <p className="text-sm text-slate-500">
                      Dashboard
                    </p>

                    <h3 className="text-xl font-bold">
                      School Overview
                    </h3>

                  </div>


                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BarChart3 size={20} />
                  </div>

                </div>


                {/* Mini Stats */}

                <div className="grid grid-cols-2 gap-4">


                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Students
                      </span>

                      <Users
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <p className="text-2xl font-bold mt-2">
                      2,500
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      +12.5% this month
                    </p>

                  </div>


                  <div className="p-4 rounded-2xl bg-green-50 border border-green-100">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Staff
                      </span>

                      <Users
                        size={18}
                        className="text-green-600"
                      />

                    </div>

                    <p className="text-2xl font-bold mt-2">
                      120
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      8 new this month
                    </p>

                  </div>


                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Attendance
                      </span>

                      <ClipboardCheck
                        size={18}
                        className="text-orange-500"
                      />

                    </div>

                    <p className="text-2xl font-bold mt-2">
                      96%
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      Excellent
                    </p>

                  </div>


                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Fees
                      </span>

                      <IndianRupee
                        size={18}
                        className="text-purple-600"
                      />

                    </div>

                    <p className="text-2xl font-bold mt-2">
                      ₹2.5L
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      92% collected
                    </p>

                  </div>

                </div>


                {/* Activity */}

                <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">

                  <div className="flex items-center justify-between mb-4">

                    <h4 className="font-semibold">
                      Recent Activity
                    </h4>

                    <Clock3
                      size={17}
                      className="text-slate-400"
                    />

                  </div>


                  <div className="space-y-3">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Users size={16} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-medium">
                          New staff member added
                        </p>

                        <p className="text-xs text-slate-500">
                          10 minutes ago
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                        <ClipboardCheck size={16} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-medium">
                          Attendance updated
                        </p>

                        <p className="text-xs text-slate-500">
                          25 minutes ago
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <IndianRupee size={16} />
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-medium">
                          Fee payment received
                        </p>

                        <p className="text-xs text-slate-500">
                          1 hour ago
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>

              <p className="text-3xl font-bold">
                2,500+
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Students Managed
              </p>

            </div>


            <div>

              <p className="text-3xl font-bold">
                120+
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Staff Members
              </p>

            </div>


            <div>

              <p className="text-3xl font-bold">
                96%
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Attendance Tracking
              </p>

            </div>


            <div>

              <p className="text-3xl font-bold">
                24/7
              </p>

              <p className="text-sm text-slate-400 mt-1">
                System Access
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        id="features"
        className="py-20 bg-white"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
              Powerful Features
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Everything your school needs
            </h2>

            <p className="text-slate-500 mt-4">
              Designed to simplify school operations
              and keep your entire institution connected.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">


            <FeatureCard
              icon={<GraduationCap size={23} />}
              title="Student Management"
              description="Manage student profiles, classes, admissions and academic information."
              iconClass="bg-blue-50 text-blue-600"
            />


            <FeatureCard
              icon={<Users size={23} />}
              title="Staff Management"
              description="Manage teachers, staff types, departments and staff schedules."
              iconClass="bg-green-50 text-green-600"
            />


            <FeatureCard
              icon={<ClipboardCheck size={23} />}
              title="Attendance"
              description="Track staff and student attendance with organized records."
              iconClass="bg-orange-50 text-orange-600"
            />


            <FeatureCard
              icon={<IndianRupee size={23} />}
              title="Fee Management"
              description="Manage fee structures, collections, discounts and concessions."
              iconClass="bg-purple-50 text-purple-600"
            />


            <FeatureCard
              icon={<CalendarDays size={23} />}
              title="Event Management"
              description="Plan and manage school events, registrations and payments."
              iconClass="bg-pink-50 text-pink-600"
            />


            <FeatureCard
              icon={<BookOpen size={23} />}
              title="Academic Management"
              description="Manage classes, subjects, timetable and examinations."
              iconClass="bg-indigo-50 text-indigo-600"
            />


            <FeatureCard
              icon={<BarChart3 size={23} />}
              title="Reports & Insights"
              description="Get useful reports and clear insights across school operations."
              iconClass="bg-cyan-50 text-cyan-600"
            />


            <FeatureCard
              icon={<ShieldCheck size={23} />}
              title="Role-Based Access"
              description="Secure access for Super Admin, School Admin and Staff roles."
              iconClass="bg-emerald-50 text-emerald-600"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          MODULES
      ===================================================== */}

      <section
        id="modules"
        className="py-20 bg-slate-50"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">


            <div>

              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                One Platform
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Connected school operations in one place
              </h2>

              <p className="text-slate-600 mt-5 leading-7">
                Keep your school information organized with
                dedicated modules designed for daily administration.
              </p>


              <div className="mt-8 space-y-4">

                {[
                  "Student and staff administration",
                  "Attendance and leave management",
                  "Classes, subjects and timetable",
                  "Fees and payment management",
                  "Events, examinations and reports"
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      size={19}
                      className="text-blue-600 flex-shrink-0"
                    />

                    <span className="text-slate-700">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xl">

              <div className="grid grid-cols-2 gap-4">

                <ModuleBox
                  icon={<Users size={20} />}
                  title="Staff"
                  value="120"
                />

                <ModuleBox
                  icon={<GraduationCap size={20} />}
                  title="Students"
                  value="2.5K"
                />

                <ModuleBox
                  icon={<ClipboardCheck size={20} />}
                  title="Attendance"
                  value="96%"
                />

                <ModuleBox
                  icon={<IndianRupee size={20} />}
                  title="Collections"
                  value="₹2.5L"
                />

                <ModuleBox
                  icon={<CalendarDays size={20} />}
                  title="Events"
                  value="18"
                />

                <ModuleBox
                  icon={<BookOpen size={20} />}
                  title="Classes"
                  value="42"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY US
      ===================================================== */}

      <section
        id="why-us"
        className="py-20 bg-white"
      >

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <h2 className="text-3xl sm:text-4xl font-bold">
              Built for modern schools
            </h2>

            <p className="text-slate-500 mt-4">
              A simple, organized and secure experience
              for school administrators and staff.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <InfoCard
              icon={<ShieldCheck size={24} />}
              title="Secure Access"
              description="Role-based permissions keep important school data accessible to the right users."
            />

            <InfoCard
              icon={<BarChart3 size={24} />}
              title="Better Visibility"
              description="Get clear dashboards and organized records to make everyday decisions easier."
            />

            <InfoCard
              icon={<Clock3 size={24} />}
              title="Save Time"
              description="Reduce manual work with centralized workflows for common school operations."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 sm:px-6 lg:px-8 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 sm:px-12 text-center text-white">

            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative">

              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to manage your school smarter?
              </h2>

              <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                Access your school management dashboard
                and keep everything organized from one platform.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 mt-8 bg-white text-blue-600 hover:bg-blue-50 px-7 py-3.5 rounded-xl font-semibold transition"
              >
                Login to SchoolMS
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <GraduationCap size={19} />
              </div>

              <div>

                <p className="font-bold">
                  SchoolMS
                </p>

                <p className="text-xs text-slate-500">
                  School Management System
                </p>

              </div>

            </div>


            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} SchoolMS. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
  iconClass
}) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300">

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-500 leading-6 mt-2">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   MODULE BOX
========================================================= */

function ModuleBox({
  icon,
  title,
  value
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
        {icon}
      </div>

      <p className="text-sm text-slate-500 mt-4">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  description
}) {
  return (
    <div className="border border-slate-200 rounded-2xl p-7 bg-slate-50">

      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-500 leading-6 mt-2">
        {description}
      </p>

    </div>
  );
}

export default Welcome;