import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddFeeStructureComponent from "./AddFeeStructureComponent";

import {
  getFeeStructureComponents,
  createFeeStructureComponent,
  updateFeeStructureComponent,
  deleteFeeStructureComponent
} from "../../services/feeStructureComponentService";

import { getFeeStructures } from "../../services/feeStructureService";

function FeeStructureComponents() {

  const [components, setComponents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [feeStructures, setFeeStructures] = useState([]);

  const [search, setSearch] = useState("");

  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {

    fetchComponents();
    fetchFeeStructures();

  }, []);

  useEffect(() => {

    const filtered = components.filter(item =>
      item.component_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredData(filtered);

  }, [search, components]);

  const fetchComponents = async () => {

    try {

      const response =
        await getFeeStructureComponents();

      setComponents(response.data || []);
      setFilteredData(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchFeeStructures = async () => {

    try {

      const response =
        await getFeeStructures();

      setFeeStructures(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAdd = async (data) => {

    try {

      await createFeeStructureComponent(data);

      alert("Component Added Successfully");

      fetchComponents();

    } catch (error) {

      console.log(error);

    }

  };

  const handleUpdate = async (id, data) => {

    try {

      await updateFeeStructureComponent(id, data);

      alert("Component Updated Successfully");

      setEditData(null);
      setIsEditing(false);

      fetchComponents();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete Component?"))
      return;

    try {

      await deleteFeeStructureComponent(id);

      alert("Deleted Successfully");

      fetchComponents();

    } catch (error) {

      console.log(error);

    }

  };

  const totalAmount =
    components.reduce(
      (sum, item) =>
        sum + Number(item.final_amount || 0),
      0
    );

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Fee Structure Components
        </h1>

        <AddFeeStructureComponent
          feeStructures={feeStructures}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-blue-100 p-4 rounded-lg">

            <h3>Total Components</h3>

            <p className="text-2xl font-bold">
              {components.length}
            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-lg">

            <h3>Total Final Amount</h3>

            <p className="text-2xl font-bold">
              ₹ {totalAmount}
            </p>

          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">

            <h3>Active Components</h3>

            <p className="text-2xl font-bold">

              {
                components.filter(
                  x => x.status === "active"
                ).length
              }

            </p>

          </div>

        </div>

        <input
          type="text"
          placeholder="Search Component..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-full mb-4"
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">ID</th>
                <th className="p-4">Fee Structure</th>
                <th className="p-4">Component</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Tax %</th>
                <th className="p-4">Tax Amount</th>
                <th className="p-4">Final Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredData.length > 0 ?

                filteredData.map(item => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.fee_structure_id}
                    </td>

                    <td className="p-4">
                      {item.component_name}
                    </td>

                    <td className="p-4">
                      ₹ {item.amount}
                    </td>

                    <td className="p-4">
                      {item.tax_percentage} %
                    </td>

                    <td className="p-4">
                      ₹ {item.tax_amount}
                    </td>

                    <td className="p-4">
                      ₹ {item.final_amount}
                    </td>

                    <td className="p-4">
                      {item.status}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => {
                            setEditData(item);
                            setIsEditing(true);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth"
                            });
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="9"
                    className="text-center p-5"
                  >
                    No Components Found
                  </td>

                </tr>

              }

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default FeeStructureComponents;