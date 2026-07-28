import React, { useEffect, useMemo, useState } from "react";
import AddFeeInstallment from "./AddFeeInstallment";
import {
  getFeeInstallments,
  deleteFeeInstallment,
} from "../../services/feeInstallmentService";

const FeeInstallments = () => {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadInstallments();
  }, []);

  const loadInstallments = async () => {
    try {
      setLoading(true);

      const res = await getFeeInstallments();

      setInstallments(res.data || []);
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this installment?")) return;

    try {
      await deleteFeeInstallment(id);
      loadInstallments();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const filteredData = useMemo(() => {
    return installments.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.installment_name?.toLowerCase().includes(keyword) ||
        item.school_name?.toLowerCase().includes(keyword) ||
        item.batch_code?.toLowerCase().includes(keyword)
      );
    });
  }, [installments, search]);

  const totalAmount = filteredData.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const activeCount = filteredData.filter(
    (item) => item.status === "ACTIVE"
  ).length;

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Fee Installments
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Manage all fee installments
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Installment
        </button>

      </div>

      {/* Dashboard */}

      <div className="grid md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-6">
          <p>Total Installments</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {filteredData.length}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-6">
          <p>Total Amount</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹ {totalAmount}
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-6">
          <p>Active Installments</p>
          <h2 className="text-3xl font-bold text-purple-600">
            {activeCount}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-5 mb-6">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 dark:bg-slate-800 dark:border-slate-700"
        />

      </div>

      {/* Form */}

      {showForm && (
        <div className="mb-6">
          <AddFeeInstallment
            editData={editData}
            onSuccess={() => {
              setShowForm(false);
              setEditData(null);
              loadInstallments();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditData(null);
            }}
          />
        </div>
      )}

      {/* Table */}

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Batch</th>
                <th className="px-4 py-3">Installment</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Late Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="9" className="text-center py-8">
                    Loading...
                  </td>
                </tr>

              ) : filteredData.length === 0 ? (

                <tr>
                  <td colSpan="9" className="text-center py-8">
                    No Fee Installments Found
                  </td>
                </tr>

              ) : (

                filteredData.map((item, index) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
                  >

                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.school_name}</td>
                    <td className="px-4 py-3">{item.batch_code}</td>
                    <td className="px-4 py-3">{item.installment_name}</td>
                    <td className="px-4 py-3">₹ {item.amount}</td>
                    <td className="px-4 py-3">{item.due_date}</td>
                    <td className="px-4 py-3">₹ {item.late_fee}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => {
                            setEditData(item);
                            setShowForm(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
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

      </div>

    </div>
  );
};

export default FeeInstallments;