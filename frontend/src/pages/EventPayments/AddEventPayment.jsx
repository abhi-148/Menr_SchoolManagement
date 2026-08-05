import { useEffect, useState } from "react";

import {

  createEventPayment,

  updateEventPayment,

} from "../../services/eventPaymentService";

import {

  getEventRegistrations,

} from "../../services/eventRegistrationService";

const AddEventPayment = ({

  editData,

  onSuccess,

  onCancel,

}) => {

  const [loading, setLoading] = useState(false);

  const [registrations, setRegistrations] = useState([]);

  const [formData, setFormData] = useState({

    registration_id: "",

    school_id: "",

    deposited_to_school_bank_id: "",

    amount: "",

    payment_method: "CASH",

    transaction_id: "",

    payment_status: "COMPLETED",

    payment_date: "",

    remarks: "",

    status: "ACTIVE",

  });

  useEffect(() => {

    loadRegistrations();

  }, []);

  const loadRegistrations = async () => {

    try {

     const res = await getEventRegistrations();

console.log("Registrations =>", res.data);

setRegistrations(res.data || []);

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    if (!editData) return;

    setFormData({

      registration_id:
        editData.registration_id || "",

      school_id:
        editData.school_id || "",

      deposited_to_school_bank_id:
        editData.deposited_to_school_bank_id || "",

      amount:
        editData.amount || "",

      payment_method:
        editData.payment_method || "CASH",

      transaction_id:
        editData.transaction_id || "",

      payment_status:
        editData.payment_status || "COMPLETED",

      payment_date:
        editData.payment_date
          ? editData.payment_date.substring(0, 16)
          : "",

      remarks:
        editData.remarks || "",

      status:
        editData.status || "ACTIVE",

    });

  }, [editData]);

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (editData) {

        await updateEventPayment(

          editData.event_payment_id,

          formData

        );

      }

     else {

  console.log("Payment Payload =>", formData);

  await createEventPayment(
    formData
  );

}

      onSuccess();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Something went wrong."

      );

    }

    finally {

      setLoading(false);

    }

  };

    return (

    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">

        {editData

          ? "Update Event Payment"

          : "Add Event Payment"}

      </h2>

      <form

        onSubmit={handleSubmit}

        className="grid grid-cols-1 md:grid-cols-2 gap-5"

      >

        {/* Registration */}

        <div>

          <label className="block mb-2 font-medium">

            Registration

          </label>

        <select
  name="registration_id"
  value={formData.registration_id}
 onChange={(e) => {

  const registration = registrations.find(
    (r) =>
      Number(r.registration_id) ===
      Number(e.target.value)
  );

  console.log("Selected Registration =>", registration);

  setFormData((prev) => ({
    ...prev,
    registration_id: e.target.value,
    school_id: registration?.school_id || "",
  }));

}}
  required
  className="w-full border rounded-lg p-3"
>

            <option value="">

              Select Registration

            </option>

            {registrations.map((item) => (

              <option

                key={item.registration_id}

                value={item.registration_id}

              >

                #{item.registration_id} - {item.event_name}

              </option>

            ))}

          </select>

        </div>

        {/* Amount */}

        <div>

          <label className="block mb-2 font-medium">

            Amount

          </label>

          <input

            type="number"

            name="amount"

            value={formData.amount}

            onChange={handleChange}

            required

            placeholder="Enter Amount"

            className="w-full border rounded-lg p-3"

          />

        </div>

        {/* Payment Method */}

        <div>

          <label className="block mb-2 font-medium">

            Payment Method

          </label>

          <select

            name="payment_method"

            value={formData.payment_method}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="CASH">

              CASH

            </option>

            <option value="BANK_TRANSFER">

              BANK TRANSFER

            </option>

            <option value="UPI">

              UPI

            </option>

            <option value="CHEQUE">

              CHEQUE

            </option>

            <option value="CARD">

              CARD

            </option>

            <option value="ONLINE">

              ONLINE

            </option>

          </select>

        </div>

        {/* Transaction ID */}

        <div>

          <label className="block mb-2 font-medium">

            Transaction ID

          </label>

          <input

            type="text"

            name="transaction_id"

            value={formData.transaction_id}

            onChange={handleChange}

            placeholder="Transaction ID"

            className="w-full border rounded-lg p-3"

          />

        </div>

                {/* Payment Status */}

        <div>

          <label className="block mb-2 font-medium">

            Payment Status

          </label>

          <select

            name="payment_status"

            value={formData.payment_status}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="PENDING">

              PENDING

            </option>

            <option value="COMPLETED">

              COMPLETED

            </option>

            <option value="FAILED">

              FAILED

            </option>

            <option value="REFUNDED">

              REFUNDED

            </option>

          </select>

        </div>

        {/* Payment Date */}

        <div>

          <label className="block mb-2 font-medium">

            Payment Date

          </label>

          <input

            type="datetime-local"

            name="payment_date"

            value={formData.payment_date}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          />

        </div>

        {/* Deposited School Bank */}

        <div>

          <label className="block mb-2 font-medium">

            Deposited School Bank ID

          </label>

          <input

            type="number"

            name="deposited_to_school_bank_id"

            value={formData.deposited_to_school_bank_id}

            onChange={handleChange}

            placeholder="Optional"

            className="w-full border rounded-lg p-3"

          />

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 font-medium">

            Status

          </label>

          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

            className="w-full border rounded-lg p-3"

          >

            <option value="ACTIVE">

              ACTIVE

            </option>

            <option value="INACTIVE">

              INACTIVE

            </option>

          </select>

        </div>

        {/* Remarks */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">

            Remarks

          </label>

          <textarea

            rows="4"

            name="remarks"

            value={formData.remarks}

            onChange={handleChange}

            placeholder="Enter Remarks"

            className="w-full border rounded-lg p-3"

          />

        </div>

                {/* Buttons */}

        <div className="md:col-span-2 flex justify-end gap-3 mt-6">

          <button

            type="button"

            onClick={onCancel}

            className="px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"

          >

            Cancel

          </button>

          <button

            type="submit"

            disabled={loading}

            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400"

          >

            {loading

              ? "Saving..."

              : editData

              ? "Update Payment"

              : "Save Payment"}

          </button>

        </div>

      </form>

    </div>

  );

};

export default AddEventPayment;