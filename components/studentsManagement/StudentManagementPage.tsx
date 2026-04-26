"use client";
import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import { Student, Course } from "./types";
import api from "@/app/services/api";

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [st, co] = await Promise.all([
        api.get("/students"),
        api.get("/courses"),
      ]);
      setStudents(st.data.data ?? []);
      setCourses(co.data.data?.map((c: any) => ({
        course_id: c._id,
        course_name: c.course_name,
      })) ?? []);
    } catch (e) { console.error(e); }
  };

  const addStudent = async (data: Student) => {
    try {
      await api.post("/students", data);
      loadAll();
    } catch (e) { console.error(e); }
  };

  const updateStudent = async (data: Student) => {
    try {
      await api.put(`/students/${(selected as any)._id}`, data);
      setSelected(null);
      setIsEdit(false);
      loadAll();
    } catch (e) { console.error(e); }
  };

  const editStudent = (s: Student) => {
    setSelected(s);
    setIsEdit(true);
  };

  const toggleStatus = async (id: string) => {
    try {
      const student = students.find((s: any) => s._id === id || s.student_id === id);
      if (!student) return;
      await api.put(`/students/${id}`, {
        ...student,
        status: student.status === "Active" ? "Inactive" : "Active",
      });
      loadAll();
    } catch (e) { console.error(e); }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.student_id?.toLowerCase().includes(search.toLowerCase());
    const matchCourse = filterCourse
      ? s.courses?.some((c) => c.course_name === filterCourse)
      : true;
    const matchStatus = filterStatus ? s.status === filterStatus : true;
    return matchSearch && matchCourse && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <StudentForm
        student={selected}
        isEditMode={isEdit}
        courses={courses}
        onAdd={addStudent}
        onUpdate={updateStudent}
        onCancel={() => { setSelected(null); setIsEdit(false); }}
      />
      <StudentTable
        students={filtered}
        courses={courses}
        search={search}
        filterCourse={filterCourse}
        filterStatus={filterStatus}
        onSearch={setSearch}
        onFilterCourse={setFilterCourse}
        onFilterStatus={setFilterStatus}
        onEdit={editStudent}
        onToggle={toggleStatus}
        onView={(s) => alert(JSON.stringify(s, null, 2))}
      />
    </div>
  );
}