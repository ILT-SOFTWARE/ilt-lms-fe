"use client";

interface Props {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function AssesmentCreationTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Type</th>
            <th className="text-left p-3">Course</th>
            <th className="text-left p-3">Deadline</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.assessment_title ?? item.title}</td>
              <td className="p-3">{item.assessment_type ?? item.type}</td>
              <td className="p-3">{item.course_name ?? item.course}</td>
              <td className="p-3">{item.deadline ?? item.dueDate}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => onDelete(item._id ?? index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}