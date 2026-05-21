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
    setForm({
      instructor_id: "",
      full_name: "",
      phone: "",
      email: "",
      status: "Active",
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow mb-6">
      <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        {editData ? "Edit Instructor" : "Add Instructor"}
      </h2>

      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        <input
          placeholder="Instructor ID"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          disabled={!!editData}
          value={form.instructor_id}
          onChange={(e) => setForm({ ...form, instructor_id: e.target.value })}
        />
        <input
          placeholder="Full Name"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Phone"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base sm:col-span-2 lg:col-span-1"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Responsive Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={submit}
          className="w-full sm:w-auto bg-teal-600 text-white px-6 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-teal-700 transition"
        >
          {editData ? "Update" : "Add"}
        </button>
        {editData && (
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
