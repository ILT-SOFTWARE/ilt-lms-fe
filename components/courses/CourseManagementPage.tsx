"use client";
import { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import CourseTable from "./CourseTable";
import api from "@/app/services/api";

export interface CourseType {
  _id?: string;
  course_id: string;
  course_name: string;
  course_fee: string;
  level: string;
  status: string;
  instructor_name: string;
}

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const emptyForm = {
    course_id: "", course_name: "", course_fee: "",
    level: "", status: "active", instructor_name: "",
  };

  const [form, setForm] = useState<CourseType>(emptyForm);

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data ?? []);
    } catch (e) { console.error(e); }
  };

  const saveCourse = async (data: CourseType) => {
    try {
      if (isEdit) {
        await api.put(`/courses/${editId}`, data);
      } else {
        await api.post("/courses", data);
      }
      loadCourses();
      cancelEdit();
    } catch (e) { console.error(e); }
  };

  const editCourse = (course: CourseType) => {
    setForm(course);
    setEditId(course._id ?? course.course_id);
    setIsEdit(true);
  };

  const toggleStatus = async (id: string) => {
    try {
      const course = courses.find((c) => c._id === id || c.course_id === id);
      if (!course) return;
      await api.put(`/courses/${id}`, {
        ...course,
        status: course.status === "active" ? "inactive" : "active",
      });
      loadCourses();
    } catch (e) { console.error(e); }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditId(null);
    setIsEdit(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>
      <CourseForm form={form} setForm={setForm} onSave={saveCourse} isEdit={isEdit} onCancel={cancelEdit} />
      <CourseTable courses={courses} onEdit={editCourse} onToggle={toggleStatus} />
    </div>
  );
}