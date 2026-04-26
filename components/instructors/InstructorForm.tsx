"use client";
import { useEffect, useState } from "react";
import { Instructor } from "./InstructorManagementPage";

interface Props {
  editData: Instructor | null;
  onSave: (data: Instructor) => void;
  onCancel: () => void;
}

export default function InstructorForm({ editData, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Instructor>({
    instructor_id: "",
    full_name: "",
    phone: "",
    email: "",
    status: "Active",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const submit = () => {
    onSave(form);
    setForm({ instructor_id: "", full_name: "", phone: "", email: "", status: "Active" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-5">{editData ? "Edit Instructor" : "Add Instructor"}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          placeholder="Instructor ID"
          className="border p-3 rounded"
          disabled={!!editData}
          value={form.instructor_id}
          onChange={(e) => setForm({ ...form, instructor_id: e.target.value })}
        />
        <input
          placeholder="Full Name"
          className="border p-3 rounded"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Phone"
          className="border p-3 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border p-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="border p-3 rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={submit} className="bg-teal-600 text-white px-6 py-2 rounded">
          {editData ? "Update" : "Add"}
        </button>
        {editData && (
          <button onClick={onCancel} className="border px-6 py-2 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}