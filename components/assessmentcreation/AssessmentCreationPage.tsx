"use client";
import { useState, useEffect } from "react";
import AssesmentCard from "./AssesmentCreationCard";
import AssesmentTable from "./AssesmentCreationTable";
import api from "@/app/services/api";

export default function Assesmentpage() {
  const [list, setList] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/assessments");
      setList(res.data.data ?? []);
    } catch (e) { console.error(e); }
  };

  const addData = async (data: any) => {
    try {
      await api.post("/assessments", {
        assessment_title: data.title,
        course_name: data.course,
        assessment_type: data.type,
        deadline: data.dueDate,
        status: "Published",
      });
      loadData();
    } catch (e) { console.error(e); }
  };

  const updateData = async (data: any) => {
    try {
      await api.put(`/assessments/${editData._id}`, {
        assessment_title: data.title,
        course_name: data.course,
        assessment_type: data.type,
        deadline: data.dueDate,
        status: data.status,
      });
      setEditData(null);
      loadData();
    } catch (e) { console.error(e); }
  };

  const deleteData = async (id: string) => {
    try {
      await api.delete(`/assessments/${id}`);
      loadData();
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assessment Creation Management</h1>
      <AssesmentCard
        editData={editData}
        onCreate={addData}
        onUpdate={updateData}
        onCancel={() => setEditData(null)}
      />
      <AssesmentTable data={list} onEdit={setEditData} onDelete={deleteData} />
    </div>
  );
}