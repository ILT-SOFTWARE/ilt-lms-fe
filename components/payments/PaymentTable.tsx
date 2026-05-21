"use client";

export default function PaymentTable({ data, onEdit, onToggle }: any) {
  return (
    <div className="bg-white shadow rounded-lg md:rounded-xl p-4 md:p-6">
      <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-6">
        Payments List
      </h2>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Student
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Course
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Bank
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: number) => (
              <tr
                key={item._id ?? i}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 text-sm text-gray-800">{item.student}</td>
                <td className="p-3 text-sm text-gray-800">{item.course}</td>
                <td className="p-3 text-sm text-gray-800 font-semibold">
                  ₹{item.amount}
                </td>
                <td className="p-3 text-sm text-gray-800">{item.bank}</td>
                <td className="p-3 text-sm text-gray-800">{item.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-xs md:text-sm font-semibold inline-block ${
                      item.status === "Paid" ? "bg-green-500" : "bg-orange-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onToggle(item._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {data.map((item: any, i: number) => (
          <div
            key={item._id ?? i}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 font-medium">STUDENT</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.student}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                    item.status === "Paid" ? "bg-green-500" : "bg-orange-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <p className="text-xs text-gray-500 font-medium">COURSE</p>
                  <p className="text-sm text-gray-800">{item.course}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">AMOUNT</p>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{item.amount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">BANK</p>
                  <p className="text-sm text-gray-800">{item.bank}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">DATE</p>
                  <p className="text-sm text-gray-800">{item.date}</p>
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 text-blue-600 hover:bg-blue-50 py-2 px-3 rounded text-sm font-medium transition"
              >
                Edit
              </button>
              <button
                onClick={() => onToggle(item._id)}
                className="flex-1 text-red-600 hover:bg-red-50 py-2 px-3 rounded text-sm font-medium transition"
              >
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm md:text-base">
            No payments found
          </p>
        </div>
      )}
    </div>
  );
}
