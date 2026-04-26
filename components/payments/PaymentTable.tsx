"use client";

export default function PaymentTable({ data, onEdit, onToggle }: any) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="font-bold text-lg mb-4">Payments List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Student</th>
            <th className="p-2">Course</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Bank</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, i: number) => (
            <tr key={item._id ?? i} className="border-t">
              <td className="p-2">{item.student}</td>
              <td className="p-2">{item.course}</td>
              <td className="p-2">{item.amount}</td>
              <td className="p-2">{item.bank}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-white text-sm ${
                  item.status === "Paid" ? "bg-green-500" : "bg-orange-400"
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                <button onClick={() => onEdit(item)} className="text-blue-600">Edit</button>
                <button onClick={() => onToggle(item._id)} className="text-red-600">Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}