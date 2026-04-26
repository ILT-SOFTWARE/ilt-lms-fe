"use client";
import { BankAccount } from "./BankAccountPage";

interface Props {
  data: BankAccount[];
  onEdit: (item: BankAccount) => void;
  onToggle: (id: number) => void;
}

export default function BankTable({ data, onEdit, onToggle }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Bank</th>
            <th className="text-left p-3">Branch</th>
            <th className="text-left p-3">Account</th>
            <th className="text-left p-3">Holder</th>
            <th className="text-left p-3">Initial</th>
            <th className="text-left p-3">Total</th>
            <th className="text-left p-3">Pending</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item._id ?? i} className="border-b">
              <td className="p-3">{item.bank_name}</td>
              <td className="p-3">{item.branch}</td>
              <td className="p-3">{item.account_number}</td>
              <td className="p-3">{item.holder_name}</td>
              <td className="p-3">Rs {item.initial_balance}</td>
              <td className="p-3">Rs {item.total_balance}</td>
              <td className="p-3">Rs {item.pending_balance}</td>
              <td className="p-3">
                <span className={`px-3 py-1 rounded text-white text-sm ${
                  item.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  disabled={item.status === "Inactive"}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onToggle(item.bank_account_id)}
                  className={`px-3 py-1 rounded text-white ${
                    item.status === "Active" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {item.status === "Active" ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}