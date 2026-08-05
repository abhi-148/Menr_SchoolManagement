import { useEffect, useState } from "react";

import {

  getEventPayments,

  deleteEventPayment,

} from "../../services/eventPaymentService";

import AddEventPayment from "./AddEventPayment";

import ViewEventPayment from "./ViewEventPayment";

const EventPayment = () => {

  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [showView, setShowView] = useState(false);

  const [editData, setEditData] = useState(null);

  const [viewData, setViewData] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadPayments();

  }, []);

  const loadPayments = async () => {

    try {

      setLoading(true);

      const res =
        await getEventPayments();

      setPayments(
        res.data || []
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this payment?"
      )
    )
      return;

    try {

      await deleteEventPayment(id);

      loadPayments();

    }

    catch (err) {

      alert(
        err.response?.data?.message
      );

    }

  };

 const filteredData = payments.filter((item) => {

  return (

    item.event_name
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.transaction_id
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.participant_type
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.payment_method
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    item.payment_status
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

});

      return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-2xl font-bold">

            Event Payments

          </h1>

          <p className="text-gray-500 mt-1">

            Manage Event Payment Records

          </p>

        </div>

        

        <button

          onClick={() => {

            setEditData(null);

            setShowForm(true);

          }}

          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"

        >

          Add Payment

        </button>

        

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500">Total Payments</h3>
    <h2 className="text-2xl font-bold">
      {payments.length}
    </h2>
  </div>

  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500">Completed</h3>
    <h2 className="text-2xl font-bold text-green-600">
      {payments.filter(
        p => p.payment_status === "COMPLETED"
      ).length}
    </h2>
  </div>

  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500">Pending</h3>
    <h2 className="text-2xl font-bold text-yellow-600">
      {payments.filter(
        p => p.payment_status === "PENDING"
      ).length}
    </h2>
  </div>

  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-gray-500">Total Amount</h3>
    <h2 className="text-2xl font-bold text-indigo-600">
      ₹{
        payments.reduce(
          (sum, p) => sum + Number(p.amount || 0),
          0
        )
      }
    </h2>
  </div>

</div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">

        <input

          type="text"

          placeholder="Search Event / Method / Status..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

          className="w-full border rounded-lg p-3 mb-5"

        />

        <div className="flex gap-3 mb-5">

  <select className="border rounded-lg p-3">

    <option>All Status</option>
    <option>COMPLETED</option>
    <option>PENDING</option>
    <option>FAILED</option>
    <option>REFUNDED</option>

  </select>

  <select className="border rounded-lg p-3">

    <option>All Methods</option>
    <option>CASH</option>
    <option>UPI</option>
    <option>CARD</option>
    <option>ONLINE</option>
    <option>CHEQUE</option>

  </select>

</div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

             <tr className="bg-gray-100 dark:bg-slate-700">

  <th className="p-3 text-left">#</th>

  <th className="p-3 text-left">Registration</th>

  <th className="p-3 text-left">Event</th>

  <th className="p-3 text-left">Participant</th>

  <th className="p-3 text-left">Amount</th>

  <th className="p-3 text-left">Method</th>

  <th className="p-3 text-left">Transaction</th>

  <th className="p-3 text-left">Status</th>

  <th className="p-3 text-left">Payment Date</th>

  <th className="p-3 text-center">Actions</th>

</tr>

            </thead>

            <tbody>

                {loading ? (

  <tr>

    <td
      colSpan="10"
      className="text-center py-8"
    >

      Loading...

    </td>

  </tr>

) : filteredData.length === 0 ? (

  <tr>

    <td
      colSpan="10"
      className="text-center py-8 text-gray-500"
    >

      No Payments Found

    </td>

  </tr>

) : (

  filteredData.map((payment, index) => (

    <tr
      key={payment.event_payment_id}
      className="border-b hover:bg-gray-50 dark:hover:bg-slate-700"
    >

    <td className="p-3">
  {index + 1}
</td>

<td className="p-3">
  #{payment.registration_id}
</td>

<td className="p-3">
  {payment.event_name}
</td>

<td className="p-3">
  {payment.participant_type}
</td>

<td className="p-3">
  ₹ {payment.amount}
</td>

<td className="p-3">
  {payment.payment_method}
</td>

<td className="p-3">
  {payment.transaction_id || "-"}
</td>

<td className="p-3">

  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold

    ${
      payment.payment_status === "COMPLETED"

        ? "bg-green-100 text-green-700"

        : payment.payment_status === "FAILED"

        ? "bg-red-100 text-red-700"

        : payment.payment_status === "REFUNDED"

        ? "bg-yellow-100 text-yellow-700"

        : "bg-blue-100 text-blue-700"
    }`}
  >
    {payment.payment_status}
  </span>

</td>

<td className="p-3">
  {payment.payment_date
    ? new Date(payment.payment_date).toLocaleDateString()
    : "-"}
</td>

{/* <td className="p-3">

  <div className="flex justify-center gap-2">

    <button
      onClick={() => {
        setViewData(payment);
        setShowView(true);
      }}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
    >
      View
    </button>

    <button
      onClick={() => {
        setEditData(payment);
        setShowForm(true);
      }}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
    >
      Edit
    </button>

    <button
      onClick={() =>
        handleDelete(payment.event_payment_id)
      }
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Delete
    </button>

  </div>

</td> */}

      <td className="p-3">

        <div className="flex justify-center gap-2">

          <button

            onClick={() => {

              setViewData(payment);

              setShowView(true);

            }}

            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"

          >

            View

          </button>

          <button

            onClick={() => {

              setEditData(payment);

              setShowForm(true);

            }}

            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"

          >

            Edit

          </button>

          <button

            onClick={() =>
              handleDelete(
                payment.event_payment_id
              )
            }

            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"

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

      {/* Add / Edit Modal */}

      {showForm && (

        <AddEventPayment

          editData={editData}

          onSuccess={() => {

            setShowForm(false);

            setEditData(null);

            loadPayments();

          }}

          onCancel={() => {

            setShowForm(false);

            setEditData(null);

          }}

        />

      )}

      {/* View Modal */}

      {showView && (

        <ViewEventPayment

          data={viewData}

          onClose={() => {

            setShowView(false);

            setViewData(null);

          }}

        />

      )}

    </div>

  );

};

export default EventPayment;