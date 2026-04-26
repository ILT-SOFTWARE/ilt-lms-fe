"use client";
import { useEffect, useState } from "react";

interface Props {
  students: any[];
  courses: any[];
  assessments: any[];
  assessmentTitles: string[];
  record: any;
  isEditMode: boolean;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function AddUpdateMarks({
  students, assessments, assessmentTitles, record, isEditMode, onSave, onCancel,
}: Props) {
  const [form, setForm] = useState(record);

  useEffect(() => {
    setForm(record);
  }, [record]);

  // Auto-fill course when assessment is selected
  useEffect(() => {
    const selected = assessments.find((a) => a.title === form.assessmentTitle);
    if (selected) {
      setForm((prev: any) => ({ ...prev, course: selected.course }));
    }
  }, [form.assessmentTitle]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Add / Update Marks</h2>
      <div className="grid md:grid-cols-4 gap-4">

        {/* Student dropdown - loads from backend */}
        <select
          className="border p-3 rounded"
          value={form.studentName || ""}
          onChange={(e) => setForm({ ...form, studentName: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.stnid} value={s.stnid}>{s.fullname}</option>
          ))}
        </select>

        {/* Assessment dropdown - loads from backend */}
        <select
          className="border p-3 rounded"
          value={form.assessmentTitle || ""}
          onChange={(e) => setForm({ ...form, assessmentTitle: e.target.value })}
        >
          <option value="">Select Assessment</option>
          {assessmentTitles.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        {/* Course - auto filled from selected assessment */}
        <input
          className="border p-3 rounded bg-gray-100"
          placeholder="Course (auto-filled)"
          value={form.course || ""}
          readOnly
        />

        {/* Marks input */}
        <input
          type="number"
          placeholder="Marks"
          className="border p-3 rounded"
          value={form.marks || ""}
          onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={() => onSave(form)} className="bg-teal-700 text-white px-6 py-2 rounded">
          {isEditMode ? "Update Marks" : "Save Marks"}
        </button>
        {isEditMode && (
          <button onClick={onCancel} className="border px-6 py-2 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}