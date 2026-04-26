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

export default function CourseForm({ form, setForm, onSave, isEdit, onCancel }: Props) {
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    api.get("/instructors")
      .then((res) => setInstructors(res.data.data ?? []))
      .catch(console.error);
  }, []);

  const handleChange = (key: keyof CourseType, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Course" : "Add New Course"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Course ID"
          className="border p-3 rounded"
          value={form.course_id}
          disabled={isEdit}
          onChange={(e) => handleChange("course_id", e.target.value)}
        />
        <input
          placeholder="Course Name"
          className="border p-3 rounded"
          value={form.course_name}
          onChange={(e) => handleChange("course_name", e.target.value)}
        />
        <input
          placeholder="Course Fee"
          className="border p-3 rounded"
          value={form.course_fee}
          onChange={(e) => handleChange("course_fee", e.target.value)}
        />
        <select
          className="border p-3 rounded"
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
          className="border p-3 rounded"
          value={form.instructor_name}
          onChange={(e) => handleChange("instructor_name", e.target.value)}
        >
          <option value="">Select Instructor</option>
          {instructors.map((ins, i) => (
            <option key={i} value={ins.full_name}>{ins.full_name}</option>
          ))}
        </select>

        <select
          className="border p-3 rounded"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={() => onSave(form)} className="bg-teal-600 text-white px-6 py-2 rounded">
          {isEdit ? "Update Course" : "Add Course"}
        </button>
        {isEdit && (
          <button onClick={onCancel} className="border px-6 py-2 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}