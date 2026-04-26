"use client";
import { Instructor } from "./InstructorManagementPage";

interface Props {
  data: Instructor[];
  onEdit: (item: Instructor) => void;
  onToggle: (id: string) => void;
}

export default function InstructorCard({ data, onEdit, onToggle }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Phone</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.instructor_id} className="border-b">
              <td className="p-3">{item.instructor_id}</td>
              <td className="p-3">{item.full_name}</td>
              <td className="p-3">{item.phone}</td>
              <td className="p-3">{item.email}</td>
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
                  onClick={() => onToggle(item._id ?? item.instructor_id)}
                  className={`px-3 py-1 rounded text-white ${
                    item.status === "Active" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {item.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}