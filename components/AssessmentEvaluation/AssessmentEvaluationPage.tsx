"use client";
import { useState, useEffect } from "react";
import AddUpdateMarks from "./AddUpadateMarks";
import AssesmentRecord from "./AssesmentRecords";
import CourseRanking from "./CourseRanking";
import api from "@/app/services/api";

export default function AssesmentEvaluationPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    loadStudents();
    loadAssessments();
    loadRecords();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data.data.map((s: any) => ({
        stnid: s._id,
        fullname: s.full_name,
      })));
    } catch (e) { console.error(e); }
  };

  const loadAssessments = async () => {
    try {
      const res = await api.get("/assessments");
      setAssessments(res.data.data.map((a: any) => ({
        title: a.assessment_title,
        course: a.course_name,
      })));
    } catch (e) { console.error(e); }
  };

  const loadRecords = async () => {
    try {
      const res = await api.get("/assessment-evaluation");
      setRecords(res.data.data ?? []);
    } catch (e) { console.error(e); }
  };

  const saveData = async (data: any) => {
    const grade =
      data.marks >= 75 ? "A" :
      data.marks >= 65 ? "B" :
      data.marks >= 55 ? "C" : "F";
    try {
      if (editData) {
        await api.put(`/assessment-evaluation/${editData._id}`, { ...data, grade });
        setEditData(null);
      } else {
        await api.post("/assessment-evaluation", { ...data, grade });
      }
      loadRecords();
    } catch (e) { console.error(e); }
  };

  const rankings = [...records]
    .sort((a, b) => b.marks - a.marks)
    .map((r, idx) => ({
      rank: idx + 1,
      studentId: r.studentName,
      studentName: students.find((s) => s.stnid === r.studentName)?.fullname || r.studentName,
      course: r.course,
      totalMarks: r.marks,
    }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assessment Evaluation Management</h1>
      <AddUpdateMarks
        students={students}
        courses={[]}
        assessments={assessments}
        assessmentTitles={assessments.map((a) => a.title)}
        record={editData || { studentName: "", course: "", assessmentTitle: "", marks: "" }}
        isEditMode={!!editData}
        onSave={saveData}
        onCancel={() => setEditData(null)}
      />
      <AssesmentRecord records={records} students={students} onEdit={setEditData} />
      <CourseRanking rankings={rankings} />
    </div>
  );
}