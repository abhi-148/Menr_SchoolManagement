const ViewEventPayment = ({

  data,

  onClose,

}) => {

  if (!data) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-3xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">

            Event Payment Details

          </h2>

          <button

            onClick={onClose}

            className="text-red-500 text-xl font-bold"

          >

            ✕

          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="font-semibold">

              Event

            </label>

            <p>

              {data.event_name || "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Registration ID

            </label>

            <p>

              {data.registration_id}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Amount

            </label>

            <p>

              ₹ {data.amount}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Payment Method

            </label>

            <p>

              {data.payment_method}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Transaction ID

            </label>

            <p>

              {data.transaction_id || "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Payment Status

            </label>

            <p>

              <span

                className={`px-3 py-1 rounded-full text-xs font-semibold

                ${data.payment_status === "COMPLETED"

                  ? "bg-green-100 text-green-700"

                  : data.payment_status === "FAILED"

                  ? "bg-red-100 text-red-700"

                  : data.payment_status === "REFUNDED"

                  ? "bg-yellow-100 text-yellow-700"

                  : "bg-blue-100 text-blue-700"

                }`}

              >

                {data.payment_status}

              </span>

            </p>

          </div>

                    <div>

            <label className="font-semibold">

              Payment Date

            </label>

            <p>

              {data.payment_date

                ? new Date(

                    data.payment_date

                  ).toLocaleString()

                : "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Status

            </label>

            <p>

              {data.status}

            </p>

          </div>

          <div className="md:col-span-2">

            <label className="font-semibold">

              Remarks

            </label>

            <p className="mt-1 whitespace-pre-wrap">

              {data.remarks || "-"}

            </p>

          </div>

        </div>

        <div className="flex justify-end mt-8">

          <button

            onClick={onClose}

            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

};

export default ViewEventPayment;