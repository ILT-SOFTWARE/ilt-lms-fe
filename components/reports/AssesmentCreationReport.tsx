"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function AssessmentCreationReport() {
  const [stats, setStats] = useState({ total: 0, published: 0, expired: 0 });
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const [t, p, e] = await Promise.all([
        ReportsManagment.getTotalAssessments(),
        ReportsManagment.getPublishedAssessments(),
        ReportsManagment.getExpiredAssessments(),
      ]);
      setStats({
        total: t?.data?.total_assessments ?? 0,
        published: p?.data?.published_assessments ?? 0,
        expired: e?.data?.expired_assessments ?? 0,
      });
    } catch (e) { console.error(e); }
    finally { setLoadingStats(false); }
  };

  const openList = async () => {
    setOpen(true);
    setLoadingList(true);
    try {
      const res = await ReportsManagment.getAssessmentReport();
      setAssessments(res?.data?.data ?? []);
    } catch (e) { console.error(e); }
    finally { setLoadingList(false); }
  };

  const exportExcel = () => {
    const data = assessments.map((a, i) => ({
      "#": i + 1, Title: a.assessment_title,
      Course: a.course_name, Type: a.assessment_type,
      Due: a.deadline, Status: a.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Assessments");
    XLSX.writeFile(wb, "Assessment_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    doc.text("Assessment Schedule Report", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["#", "Title", "Course", "Type", "Due", "Status"]],
      body: assessments.map((a, i) => [i + 1, a.assessment_title, a.course_name, a.assessment_type, a.deadline, a.status]),
    });
    doc.save("Assessment_Report.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessment Schedule Report</h1>
          <p className="text-gray-500">Real-time overview of assessment schedules</p>
        </div>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">LIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-100 p-4 rounded-xl">Total: {loadingStats ? "..." : stats.total}</div>
        <div className="bg-green-100 p-4 rounded-xl">Published: {loadingStats ? "..." : stats.published}</div>
        <div className="bg-orange-100 p-4 rounded-xl">Expired: {loadingStats ? "..." : stats.expired}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={openList} className="bg-blue-600 text-white px-4 py-2 rounded">Assessment List</button>
        <button onClick={exportExcel} className="bg-green-600 text-white px-4 py-2 rounded">Excel</button>
        <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded">PDF</button>
      </div>
      {open && (
        <div className="bg-white border rounded-xl p-4">
          {loadingList ? <p>Loading...</p> : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr><th>#</th><th>Title</th><th>Course</th><th>Type</th><th>Due</th><th>Status</th></tr>
              </thead>
              <tbody>
                {assessments.map((a, i) => (
                  <tr key={i} className="text-center border-t">
                    <td>{i + 1}</td><td>{a.assessment_title}</td><td>{a.course_name}</td>
                    <td>{a.assessment_type}</td><td>{a.deadline}</td><td>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}