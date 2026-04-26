"use client";
import { useState, useEffect } from "react";
import InstructorForm from "./InstructorForm";
import InstructorCard from "./InstructorTable";
import api from "@/app/services/api";

export interface Instructor {
  _id?: string;
  instructor_id: string;
  full_name: string;
  phone: string;
  email: string;
  status: string;
}

export default function InstructorManagementPage() {
  const [list, setList] = useState<Instructor[]>([]);
  const [editData, setEditData] = useState<Instructor | null>(null);

  useEffect(() => { loadInstructors(); }, []);

  const loadInstructors = async () => {
    try {
      const res = await api.get("/instructors");
      setList(res.data.data ?? []);
    } catch (e) { console.error(e); }
  };

  const saveInstructor = async (data: Instructor) => {
    try {
      if (editData) {
        await api.put(`/instructors/${editData._id}`, data);
        setEditData(null);
      } else {
        await api.post("/instructors", data);
      }
      loadInstructors();
    } catch (e) { console.error(e); }
  };

  const toggleStatus = async (id: string) => {
    try {
      const item = list.find((i) => i._id === id || i.instructor_id === id);
      if (!item) return;
      await api.put(`/instructors/${id}`, {
        ...item,
        status: item.status === "Active" ? "Inactive" : "Active",
      });
      loadInstructors();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Instructor Management</h1>
      <InstructorForm editData={editData} onSave={saveInstructor} onCancel={() => setEditData(null)} />
      <InstructorCard data={list} onEdit={setEditData} onToggle={toggleStatus} />
    </div>
  );
}