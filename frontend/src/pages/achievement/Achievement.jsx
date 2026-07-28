import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import AddAchievement from "./AddAchievement";

import {

  getAchievements,

  createAchievement,

  updateAchievement,

  deleteAchievement,

  searchAchievement

} from "../../services/achievementService";

function Achievement() {

  const [

    achievements,

    setAchievements

  ] = useState([]);

  const [

    editingAchievement,

    setEditingAchievement

  ] = useState(null);

  const [

    search,

    setSearch

  ] = useState("");

  useEffect(() => {

    fetchAchievements();

  }, []);

  const fetchAchievements = async () => {

    try {

      const response = await getAchievements();

console.log("Achievement Response:", response.data);

setAchievements(
  response.data.data || []
);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearch = async (keyword) => {

    setSearch(keyword);

    try {

      if (!keyword) {

        fetchAchievements();

        return;

      }

     const response = await searchAchievement(keyword);

setAchievements(
  response.data.data || []
);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddAchievement = async (data) => {

    try {

      if (editingAchievement) {

        await updateAchievement(

          editingAchievement.id,

          data

        );

        alert(
          "Achievement Updated Successfully"
        );

        setEditingAchievement(null);

      } else {

        await createAchievement(data);

        alert(
          "Achievement Added Successfully"
        );

      }

      fetchAchievements();

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  const handleEdit = (item) => {

    setEditingAchievement(item);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this Achievement?"

    );

    if (!confirmDelete)
      return;

    try {

      await deleteAchievement(id);

      alert(
        "Achievement Deleted Successfully"
      );

      fetchAchievements();

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

            Achievement Management

          </h1>

          <input

            type="text"

            placeholder="Search Achievement..."

            value={search}

            onChange={(e)=>

              handleSearch(
                e.target.value
              )

            }

            className="border rounded-lg p-3 w-72"

          />

        </div>

        <AddAchievement

          onAdd={handleAddAchievement}

          editingAchievement={editingAchievement}

          cancelEdit={()=>

            setEditingAchievement(null)

          }

        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Student ID
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Level
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

                              {achievements.length > 0 ? (

                achievements.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.student_id}
                    </td>

                    <td className="p-4 font-medium">
                      {item.title}
                    </td>

                    <td className="p-4">
                      {item.achievement_category}
                    </td>

                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {item.achievement_level}

                      </span>

                    </td>

                    <td className="p-4">

                      {item.status === "ACTIVE" ? (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

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
                            handleEdit(item)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >

                    No Achievements Found

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

export default Achievement;
           