import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddFeeStructure
from "./AddFeeStructure";

import {
  getFeeStructures,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure
} from "../../services/feeStructureService";

function FeeStructure() {

  const [
    feeStructures,
    setFeeStructures
  ] = useState([]);

  const [
    filteredData,
    setFilteredData
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    editData,
    setEditData
  ] = useState(null);

  const [
    isEditing,
    setIsEditing
  ] = useState(false);

  useEffect(() => {

    fetchData();

  }, []);

  useEffect(() => {

    const filtered =
      feeStructures.filter(
        (item) =>

         item.batch_code
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

       item.school_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredData(
      filtered
    );

  }, [
    search,
    feeStructures
  ]);

  const fetchData = async () => {
  try {
    const response = await getFeeStructures();

    console.log("API Response =>", response);
    console.log("Data =>", response.data);

    setFeeStructures(response.data || []);
    setFilteredData(response.data || []);

  } catch (error) {
    console.log(error);
  }
};

  

  const handleAdd =
  async (data) => {

    try {

      await createFeeStructure(
        data
      );

      alert(
        "Fee Structure Added Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit =
  (item) => {

    setEditData(item);

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const handleUpdate =
  async (
    id,
    data
  ) => {

    try {

      await updateFeeStructure(
        id,
        data
      );

      alert(
        "Fee Structure Updated Successfully"
      );

      setEditData(null);

      setIsEditing(false);

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Fee Structure?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteFeeStructure(
        id
      );

      alert(
        "Fee Structure Deleted Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const totalAmount =
    feeStructures.reduce(
      (
        sum,
        item
      ) =>
        sum +
        Number(
        item.total_amount || 0
        ),
      0
    );

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Fee Structure
        </h1>

        <AddFeeStructure
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        {/* Dashboard */}

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-blue-100 p-4 rounded-lg">

            <h3>
              Total Structures
            </h3>

            <p className="text-2xl font-bold">
              {
                feeStructures.length
              }
            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-lg">

            <h3>
              Total Amount
            </h3>

            <p className="text-2xl font-bold">
              ₹{totalAmount}
            </p>

          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">

            <h3>
            Payment Types
            </h3>

            <p className="text-2xl font-bold">
              {
                new Set(
                  feeStructures.map(
                    (item) =>
                      item.payment_type
                  )
                ).size
              }
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="mb-4">

          <input
            type="text"
            placeholder="Search School, Batch or Academic Year..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full"
          />

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                 School
                </th>

                <th className="p-4">
                 Batch
                </th>

                <th className="p-4">
                 Academic Year 
                </th>

                <th className="p-4">
                 Total Amount
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredData.length >
                0 ? (

                  filteredData.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-t"
                      >

                        <td className="p-4">
                          {item.id}
                        </td>

                        <td className="p-4">
                          {
                            item.school_name
                          }
                        </td>

                        <td className="p-4">
                          {
                            item.batch_code
                          }
                        </td>

                        <td className="p-4">
                          {
                           item.academic_year_name
                          }
                        </td>

                        <td className="p-4">
{item.due_date}
</td>

<td className="p-4">
{item.payment_type}
</td><td className="p-4">
                          ₹{item.total_amount}
                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                handleEdit(
                                  item
                                )
                              }
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded"
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
                      className="text-center p-5"
                    >
                      No Data Found
                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default FeeStructure;