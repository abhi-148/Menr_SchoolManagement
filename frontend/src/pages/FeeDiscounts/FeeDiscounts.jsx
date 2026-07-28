import { useEffect, useMemo, useState } from "react";
import AddFeeDiscount from "./AddFeeDiscount";
import {
  deleteFeeDiscount,
  getFeeDiscounts,
} from "../../services/feeDiscountService";

const FeeDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadDiscounts();
  }, []);

  const loadDiscounts = async () => {
    try {
      setLoading(true);

      const res = await getFeeDiscounts();

      setDiscounts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this discount?")) return;

    try {
      await deleteFeeDiscount(id);

      loadDiscounts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const filteredData = useMemo(() => {
    return discounts.filter((item) =>
      `${item.discount_name} ${item.discount_type} ${item.school_name} ${item.batch_code}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [discounts, search]);

  const activeCount = discounts.filter(
    (x) => x.status === "ACTIVE"
  ).length;

  const totalDiscountValue = discounts.reduce(
    (sum, item) => sum + Number(item.discount_value || 0),
    0
  );

    return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Fee Discounts
          </h1>

          <p className="text-gray-500">
            Manage fee discounts
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Discount
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Total Discounts
          </h3>

          <p className="text-3xl font-bold">
            {discounts.length}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Active Discounts
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {activeCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">
            Total Discount Value
          </h3>

          <p className="text-3xl font-bold text-indigo-600">
            ₹ {totalDiscountValue}
          </p>
        </div>

      </div>

      {showForm && (
        <div className="mb-6">
          <AddFeeDiscount
            editData={editData}
            onCancel={() => {
              setShowForm(false);
              setEditData(null);
            }}
            onSuccess={() => {
              setShowForm(false);
              setEditData(null);
              loadDiscounts();
            }}
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-80 border rounded-lg px-4 py-2"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">
                  Type
                </th>

                <th className="p-3 text-left">
                  Value
                </th>

                <th className="p-3 text-left">
                  School
                </th>

                <th className="p-3 text-left">
                  Batch
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredData.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6"
                  >
                    No Data Found
                  </td>

                </tr>

              ) : (

                filteredData.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {item.discount_name}
                    </td>

                    <td className="p-3">
                      {item.discount_type}
                    </td>

                    <td className="p-3">
                      {item.discount_value}
                    </td>

                    <td className="p-3">
                      {item.school_name}
                    </td>

                    <td className="p-3">
                      {item.batch_code}
                    </td>

                    <td className="p-3">
                      {item.status}
                    </td>

                    <td className="p-3 text-center">

                      <button
                        onClick={() => {
                          setEditData(item);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
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

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default FeeDiscounts;