"use client";

import { useEffect, useState } from "react";
import { Student, Course } from "./types";

type Props = {
  student: Student | null;
  isEditMode: boolean;
  courses: Course[];
  onAdd: (data: Student) => void;
  onUpdate: (data: Student) => void;
  onCancel: () => void;
};

const empty: Student = {
  student_id: "",
  full_name: "",
  dob: "",
  gender: "",
  residential_address: "",
  email_address: "",
  phone_number: "",
  courses: [],
  enrollment_date: "",
  status: "Active",
};

export default function StudentForm({
  student,
  isEditMode,
  courses,
  onAdd,
  onUpdate,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Student>(empty);

  useEffect(() => {
    if (student) setForm(student);
    else setForm(empty);
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.student_id || !form.full_name) return;
    if (isEditMode) onUpdate(form);
    else onAdd(form);
    setForm(empty);
  };

  const inputClass =
    "border border-gray-300 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white";
  const labelClass = "text-sm font-medium text-gray-600 mb-1 block";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        {isEditMode ? "✏️ Update Student" : "Add New Student"}
      </h2>

      {/* Row 1 — 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
        <div>
          <label className={labelClass}>Student ID</label>
          <input
            name="student_id"
            placeholder="Student ID"
            className={inputClass}
            value={form.student_id}
            onChange={handleChange}
            disabled={isEditMode}
          />
        </div>
        <div>
          <label className={labelClass}>Student Full Name</label>
          <input
            name="full_name"
            placeholder="Student Full Name"
            className={inputClass}
            value={form.full_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            name="dob"
            className={inputClass}
            value={form.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select
            name="gender"
            className={inputClass}
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Row 2 — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className={labelClass}>Residential Address</label>
          <input
            name="residential_address"
            placeholder="Residential Address"
            className={inputClass}
            value={form.residential_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            name="email_address"
            placeholder="Email Address"
            className={inputClass}
            value={form.email_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            name="phone_number"
            placeholder="Phone Number"
            className={inputClass}
            value={form.phone_number}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 3 — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
        <div>
          <label className={labelClass}>Select Courses</label>
          <select
            className={inputClass}
            onChange={(e) => {
              const course = courses.find(
                (c) => c.course_name === e.target.value,
              );
              if (!course) return;
              if (!form.courses.find((c) => c.course_id === course.course_id))
                setForm({ ...form, courses: [...form.courses, course] });
            }}
          >
            <option value="">Select Courses</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_name}>
                {c.course_name}
              </option>
            ))}
          </select>
          {form.courses.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {form.courses.map((c) => (
                <span
                  key={c.course_id}
                  className="bg-teal-50 border border-teal-300 text-teal-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {c.course_name}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        courses: form.courses.filter(
                          (x) => x.course_id !== c.course_id,
                        ),
                      })
                    }
                    className="ml-1 text-teal-500 hover:text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className={labelClass}>Enrollment Date</label>
          <input
            type="date"
            name="enrollment_date"
            className={inputClass}
            value={form.enrollment_date}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          {isEditMode ? "Update Student" : "Add Student"}
        </button>
        {isEditMode && (
          <button
            onClick={onCancel}
            className="border border-gray-300 px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
