"use client";

import { Student, Course } from "./types";

type Props = {
  students: Student[];
  courses: Course[];
  search: string;
  filterCourse: string;
  filterStatus: string;
  onSearch: (v: string) => void;
  onFilterCourse: (v: string) => void;
  onFilterStatus: (v: string) => void;
  onEdit: (s: Student) => void;
  onToggle: (id: string) => void;
  onView: (s: Student) => void;
};

export default function StudentTable({
  students, courses, search, filterCourse, filterStatus,
  onSearch, onFilterCourse, onFilterStatus, onEdit, onToggle, onView,
}: Props) {
  const selectClass = "border border-gray-300 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input placeholder="Search by Name or ID"
            className="border border-gray-300 pl-9 pr-3 py-2.5 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={search} onChange={(e) => onSearch(e.target.value)} />
        </div>
        <select className={`${selectClass} md:w-52`} value={filterCourse} onChange={(e) => onFilterCourse(e.target.value)}>
          <option value="">Filter by Course</option>
          {courses.map((c) => <option key={c.course_id} value={c.course_name}>{c.course_name}</option>)}
        </select>
        <select className={`${selectClass} md:w-44`} value={filterStatus} onChange={(e) => onFilterStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              {["Student ID","Full Name","Date of Birth","Gender","Address","Email","Phone","Courses","Enrollment Date","Status","Actions"].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-gray-500 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-16 text-gray-400 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">👤</span>
                    <span>No students found</span>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.student_id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-700">{s.student_id}</td>
                  <td className="py-4 px-4 whitespace-nowrap font-medium">{s.full_name}</td>
                  <td className="py-4 px-4 text-gray-500">{s.dob}</td>
                  <td className="py-4 px-4 text-gray-500">{s.gender}</td>
                  <td className="py-4 px-4 text-gray-500 max-w-[120px] truncate">{s.residential_address}</td>
                  <td className="py-4 px-4 text-gray-500">{s.email_address}</td>
                  <td className="py-4 px-4 text-gray-500">{s.phone_number}</td>
                  <td className="py-4 px-4 text-gray-500">{s.courses.map((c) => c.course_name).join(", ")}</td>
                  <td className="py-4 px-4 text-gray-500">{s.enrollment_date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button onClick={() => onView(s)} className="text-blue-500 hover:text-blue-700 text-xs font-medium">View</button>
                      <button onClick={() => onEdit(s)} className="text-orange-500 hover:text-orange-700 text-xs font-medium">Edit</button>
                      <button onClick={() => onToggle(s.student_id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Toggle</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}