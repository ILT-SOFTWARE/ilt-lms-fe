"use client";
import { useEffect, useState } from "react";
import api from "@/app/services/api";

interface Props {
  editData: any;
  onCreate: (data: any) => void;
  onUpdate: (data: any) => void;
  onCancel: () => void;
}

export default function AssesmentCreationCard({ editData, onCreate, onUpdate, onCancel }: Props) {
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "", type: "", course: "", dueDate: "", maxMark: "", file: null as File | null,
  });

  useEffect(() => {
    api.get("/courses")
      .then((res) => setCourses(res.data.data ?? []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.assessment_title ?? editData.title ?? "",
        type: editData.assessment_type ?? editData.type ?? "",
        course: editData.course_name ?? editData.course ?? "",
        dueDate: editData.deadline ?? editData.dueDate ?? "",
        maxMark: editData.maxMark ?? "",
        file: null,
      });
    }
  }, [editData]);

  const submit = () => {
    if (editData) onUpdate(form);
    else onCreate(form);
    setForm({ title: "", type: "", course: "", dueDate: "", maxMark: "", file: null });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-5">{editData ? "Update Assessment" : "Create Assessment"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Assessment Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Assessment Title</label>
          <input
            placeholder="Assessment Title"
            className="border p-3 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Assessment Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Assessment Type</label>
          <select
            className="border p-3 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option>Quiz</option>
            <option>Assignment</option>
            <option>Exam</option>
          </select>
        </div>

        {/* Course */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Course</label>
          <select
            className="border p-3 rounded"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          >
            <option value="">Select Course</option>
            {courses.map((c, i) => (
              <option key={i} value={c.course_name}>{c.course_name}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Due Date</label>
          <input
            type="date"
            className="border p-3 rounded"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        {/* Max Mark */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Max Mark</label>
          <input
            placeholder="Max Mark"
            className="border p-3 rounded"
            value={form.maxMark}
            onChange={(e) => setForm({ ...form, maxMark: e.target.value })}
          />
        </div>

        {/* Upload Files */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Upload Files</label>
          <div className="flex items-center gap-2 border p-3 rounded bg-white">
            <span className="text-gray-400">📎</span>
            <input
              type="file"
              className="text-sm text-gray-500 w-full"
              onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button onClick={submit} className="bg-teal-600 text-white px-6 py-2 rounded flex items-center gap-2">
          + {editData ? "Update Assessment" : "Create Assessment"}
        </button>
        {editData && (
          <button onClick={onCancel} className="border px-6 py-2 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}