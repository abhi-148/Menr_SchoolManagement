import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import AddAcademicYear from "./AddAcademicYear";

import {

  getAcademicYears,

  createAcademicYear,

  updateAcademicYear,

  deleteAcademicYear,

  searchAcademicYears

} from "../../services/academicYearService";

function AcademicYears() {

  const [academicYears, setAcademicYears] =
    useState([]);

  const [editingAcademicYear,
    setEditingAcademicYear] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    fetchAcademicYears();

  }, []);

  const fetchAcademicYears =
    async () => {

      try {

        const response =
          await getAcademicYears();

        setAcademicYears(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSearch =
    async (keyword) => {

      setSearch(keyword);

      try {

        if (!keyword) {

          fetchAcademicYears();

          return;

        }

        const response =
          await searchAcademicYears(
            keyword
          );

        setAcademicYears(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleAddAcademicYear =
    async (data) => {

      try {

        if (editingAcademicYear) {

          await updateAcademicYear(

            editingAcademicYear.id,

            data

          );

          alert(
            "Academic Year Updated Successfully"
          );

          setEditingAcademicYear(
            null
          );

        } else {

          await createAcademicYear(
            data
          );

          alert(
            "Academic Year Added Successfully"
          );

        }

        fetchAcademicYears();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Something went wrong"

        );

      }

    };

  const handleEdit =
    (academicYear) => {

      setEditingAcademicYear(
        academicYear
      );

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(

          "Are you sure you want to delete this Academic Year?"

        );

      if (!confirmDelete)
        return;

      try {

        await deleteAcademicYear(id);

        alert(
          "Academic Year Deleted Successfully"
        );

        fetchAcademicYears();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Delete Failed"

        );

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">

            Academic Year Management

          </h1>

          <input

            type="text"

            placeholder="Search..."

            className="border p-3 rounded-lg w-72"

            value={search}

            onChange={(e) =>

              handleSearch(

                e.target.value

              )

            }

          />

        </div>

        <AddAcademicYear

          onAdd={handleAddAcademicYear}

          editingAcademicYear={
            editingAcademicYear
          }

          cancelEdit={() =>

            setEditingAcademicYear(
              null
            )

          }

        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">

                  ID

                </th>

                <th className="p-4 text-left">

                  Academic Year

                </th>

                <th className="p-4 text-left">

                  Semester

                </th>

                <th className="p-4 text-left">

                  Start Date

                </th>

                <th className="p-4 text-left">

                  End Date

                </th>

                <th className="p-4 text-left">

                  Current

                </th>

                <th className="p-4 text-left">

                  Status

                </th>

                <th className="p-4 text-left">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

                              {academicYears.length > 0 ? (

                academicYears.map(
                  (academicYear) => (

                    <tr
                      key={academicYear.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {academicYear.id}
                      </td>

                      <td className="p-4 font-medium">
                        {academicYear.academic_year_name}
                      </td>

                      <td className="p-4">
                        {academicYear.semester}
                      </td>

                      <td className="p-4">
                        {academicYear.start_date}
                      </td>

                      <td className="p-4">
                        {academicYear.end_date}
                      </td>

                      <td className="p-4">

                        {academicYear.is_current ? (

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                            Current

                          </span>

                        ) : (

                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                            No

                          </span>

                        )}

                      </td>

                      <td className="p-4">

                       {String(academicYear.status).toUpperCase() === "ACTIVE" ? (
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
    ACTIVE
  </span>
) : (
  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
    INACTIVE
  </span>
)}

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleEdit(
                                academicYear
                              )
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                academicYear.id
                              )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                          >

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )

                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500"
                  >

                    No Academic Years Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AcademicYears;

                
                
           

            