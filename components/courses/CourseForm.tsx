"use client";
import { useEffect, useState } from "react";
import { CourseType } from "./CourseManagementPage";
import api from "@/app/services/api";

interface Props {
  form: CourseType;
  setForm: (data: CourseType) => void;
  onSave: (data: CourseType) => void;
  isEdit: boolean;
  onCancel: () => void;
}

export default function CourseForm({
  form,
  setForm,
  onSave,
  isEdit,
  onCancel,
}: Props) {
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    api
      .get("/instructors")
      .then((res) => setInstructors(res.data.data ?? []))
      .catch(console.error);
  }, []);

  const handleChange = (key: keyof CourseType, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow mb-6">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        {isEdit ? "Edit Course" : "Add New Course"}
      </h2>

      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        <input
          placeholder="Course ID"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.course_id}
          disabled={isEdit}
          onChange={(e) => handleChange("course_id", e.target.value)}
        />
        <input
          placeholder="Course Name"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.course_name}
          onChange={(e) => handleChange("course_name", e.target.value)}
        />
        <input
          placeholder="Course Fee"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.course_fee}
          onChange={(e) => handleChange("course_fee", e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.level}
          onChange={(e) => handleChange("level", e.target.value)}
        >
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        {/* Instructor dropdown from backend */}
        <select
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.instructor_name}
          onChange={(e) => handleChange("instructor_name", e.target.value)}
        >
          <option value="">Select Instructor</option>
          {instructors.map((ins, i) => (
            <option key={i} value={ins.full_name}>
              {ins.full_name}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>

      {/* Responsive Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onSave(form)}
          className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-teal-700 transition"
        >
          {isEdit ? "Update Course" : "Add Course"}
        </button>
        {isEdit && (
          <button
            onClick={onCancel}
            className="w-full sm:w-auto border border-gray-300 px-6 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
