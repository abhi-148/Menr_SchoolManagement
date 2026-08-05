import { useEffect, useMemo, useState } from "react";
import AddBranch from "./AddBranch";

import {
  getBranches,
  deleteBranch,
} from "../../services/branchService";

const Branches = () => {

  // ===========================
  // STATES
  // ===========================

  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage] = useState(10);

  const [refreshing, setRefreshing] = useState(false);

  const [sortField, setSortField] = useState("branch_name");

  const [sortOrder, setSortOrder] = useState("asc");

  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);

      const response = await getBranches();

      setBranches(response.data || response);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load branches."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // REFRESH DATA
  // ===========================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await loadBranches();
    } finally {
      setRefreshing(false);
    }
  };

  // ===========================
  // DELETE BRANCH
  // ===========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmDelete) return;

    try {

      await deleteBranch(id);

      await loadBranches();

      alert("Branch deleted successfully.");

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Delete failed."
      );

    }

  };

  // ===========================
  // SEARCH
  // ===========================

  const filteredBranches = useMemo(() => {

    return branches.filter((branch) => {

      return Object.values(branch)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    });

  }, [branches, search]);

  // ===========================
  // SORTING
  // ===========================

  const sortedBranches = useMemo(() => {

    const data = [...filteredBranches];

    data.sort((a, b) => {

      const first = a[sortField] || "";

      const second = b[sortField] || "";

      if (sortOrder === "asc") {
        return first.toString().localeCompare(second.toString());
      }

      return second.toString().localeCompare(first.toString());

    });

    return data;

  }, [filteredBranches, sortField, sortOrder]);

  // ===========================
  // PAGINATION
  // ===========================

  const totalPages = Math.ceil(
    sortedBranches.length / rowsPerPage
  );

  const indexOfLastRow = currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentBranches =
    sortedBranches.slice(
      indexOfFirstRow,
      indexOfLastRow
    );

  // ===========================
  // CHANGE PAGE
  // ===========================

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(currentPage + 1);

    }

  };

  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);

    }

  };

  // ===========================
  // SORT FUNCTION
  // ===========================

  const handleSort = (field) => {

    if (sortField === field) {

      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );

    } else {

      setSortField(field);

      setSortOrder("asc");

    }

  };

  // ===========================
  // RESET FORM
  // ===========================

  const handleAddNew = () => {

    setEditData(null);

    setShowForm(true);

  };

  // ===========================
  // JSX START
  // ===========================

  return (

    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Branch Management
          </h2>

          <p className="text-gray-500 mt-1">
            Manage all school branches.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white"
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

          <button
            onClick={handleAddNew}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add Branch
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search branch..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Add / Edit Form */}

      {showForm && (

        <div className="mb-8">

          <AddBranch
            editData={editData}
            onCancel={() => {

              setShowForm(false);

              setEditData(null);

            }}
            onSuccess={() => {

              setShowForm(false);

              setEditData(null);

              loadBranches();

            }}
          />

        </div>

      )}

      {/* Table starts in Part 2 */}

            {/* ===========================
          TABLE
      ============================ */}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">

        <table className="w-full min-w-[1100px]">

          {/* ===========================
              TABLE HEADER
          ============================ */}

          <thead className="bg-gray-100 dark:bg-slate-700">

            <tr>

              <th className="border px-4 py-3 text-center w-16">
                #
              </th>

              <th
                onClick={() => handleSort("branch_code")}
                className="border px-4 py-3 text-left cursor-pointer select-none"
              >
                Branch Code
                {sortField === "branch_code" &&
                  (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>

              <th
                onClick={() => handleSort("branch_name")}
                className="border px-4 py-3 text-left cursor-pointer select-none"
              >
                Branch Name
                {sortField === "branch_name" &&
                  (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>

              <th
                onClick={() => handleSort("branch_type")}
                className="border px-4 py-3 text-left cursor-pointer select-none"
              >
                Type
                {sortField === "branch_type" &&
                  (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>

              <th className="border px-4 py-3 text-left">
                City
              </th>

              <th className="border px-4 py-3 text-left">
                Phone
              </th>

              <th className="border px-4 py-3 text-left">
                Email
              </th>

              <th className="border px-4 py-3 text-left">
                Principal
              </th>

              <th className="border px-4 py-3 text-center">
                Status
              </th>

              <th className="border px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* ===========================
              TABLE BODY
          ============================ */}

          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>

                <td
                  colSpan="10"
                  className="text-center py-12"
                >

                  <div className="flex flex-col items-center gap-3">

                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>

                    <p className="text-gray-500">
                      Loading branches...
                    </p>

                  </div>

                </td>

              </tr>

            ) : currentBranches.length === 0 ? (

              /* EMPTY */

              <tr>

                <td
                  colSpan="10"
                  className="text-center py-12"
                >

                  <div className="space-y-3">

                    <h3 className="text-xl font-semibold">

                      No Branch Found

                    </h3>

                    <p className="text-gray-500">

                      Try changing the search keyword.

                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              currentBranches.map((branch, index) => (

                <tr
                  key={branch.branch_id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >

                  {/* SERIAL */}

                  <td className="border px-4 py-3 text-center">

                    {indexOfFirstRow + index + 1}

                  </td>

                  {/* CODE */}

                  <td className="border px-4 py-3 font-medium">

                    {branch.branch_code}

                  </td>

                  {/* NAME */}

                  <td className="border px-4 py-3">

                    {branch.branch_name}

                  </td>

                  {/* TYPE */}

                  <td className="border px-4 py-3">

                    {branch.branch_type || "-"}

                  </td>

                  {/* CITY */}

                  <td className="border px-4 py-3">

                    {branch.city || "-"}

                  </td>

                  {/* PHONE */}

                  <td className="border px-4 py-3">

                    {branch.phone || "-"}

                  </td>

                  {/* EMAIL */}

                  <td className="border px-4 py-3">

                    {branch.email || "-"}

                  </td>

                  {/* PRINCIPAL */}

                  <td className="border px-4 py-3">

                    {branch.principal_name || "-"}

                  </td>

                  {/* STATUS */}

                  <td className="border px-4 py-3 text-center">

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        branch.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {branch.status}

                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="border px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {

                          setEditData(branch);

                          setShowForm(true);

                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(branch.branch_id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >

                        Delete

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ===========================
          TABLE INFO
      ============================ */}

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

        <div className="text-sm text-gray-600 dark:text-gray-300">

          Showing

          <span className="font-semibold mx-1">

            {currentBranches.length}

          </span>

          of

          <span className="font-semibold mx-1">

            {sortedBranches.length}

          </span>

          branches

        </div>

        {/* Pagination comes in Part 3 */}

                {/* ===========================
            PAGINATION
        =========================== */}

        <div className="flex items-center gap-2">

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-800 text-white"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (

            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600"
              }`}
            >
              {index + 1}
            </button>

          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-800 text-white"
            }`}
          >
            Next
          </button>

        </div>

      </div>

      {/* ===========================
          FOOTER
      =========================== */}

      <div className="mt-8 border-t pt-4">

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">

          <div>
            Total Branches :
            <span className="font-semibold ml-2 text-black dark:text-white">
              {branches.length}
            </span>
          </div>

          <div>
            Current Page :
            <span className="font-semibold ml-2 text-black dark:text-white">
              {currentPage}
            </span>
          </div>

          <div>
            Records Per Page :
            <span className="font-semibold ml-2 text-black dark:text-white">
              {rowsPerPage}
            </span>
          </div>

        </div>

      </div>

    </div>

  );

};

export default Branches;