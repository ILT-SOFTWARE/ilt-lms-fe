"use client";
import { CourseType } from "./CourseManagementPage";

interface Props {
  courses: CourseType[];
  onEdit: (course: CourseType) => void;
  onToggle: (id: string) => void;
}

export default function CourseTable({ courses, onEdit, onToggle }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-3">Course ID</th>
            <th className="text-left p-3">Course Name</th>
            <th className="text-left p-3">Fee</th>
            <th className="text-left p-3">Level</th>
            <th className="text-left p-3">Instructor</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((item) => (
            <tr key={(item as any)._id ?? item.course_id} className="border-b">
              <td className="p-3">{item.course_id}</td>
              <td className="p-3">{item.course_name}</td>
              <td className="p-3">Rs {item.course_fee}</td>
              <td className="p-3">{item.level}</td>
              <td className="p-3">{item.instructor_name}</td>
              <td className="p-3 capitalize">{item.status}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onToggle((item as any)._id ?? item.course_id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {item.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No Courses Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
