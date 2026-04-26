"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function AssessmentEvaluationReport() {
  const [stats, setStats] = useState({ total: 0, evaluated: 0, pending: 0 });
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const res = await ReportsManagment.getAssessmentEvaluationStats();
      setStats(res?.data ?? { total: 0, evaluated: 0, pending: 0 });
    } catch (e) { console.error(e); }
  };

  const openList = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await ReportsManagment.getAssessmentEvaluationReport();
      setData(res?.data?.data ?? []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const exportExcel = () => {
    const exportData = data.map((a, i) => ({
      "#": i + 1, Student: a.student_name, Score: a.score, Status: a.status,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluation");
    XLSX.writeFile(wb, "Assessment_Evaluation.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    doc.text("Assessment Evaluation Report", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["#", "Student", "Score", "Status"]],
      body: data.map((a, i) => [i + 1, a.student_name, a.score, a.status]),
    });
    doc.save("Assessment_Evaluation.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Assessment Evaluation Report</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total: {stats.total}</div>
        <div className="bg-green-100 p-4 rounded">Evaluated: {stats.evaluated}</div>
        <div className="bg-orange-100 p-4 rounded">Pending: {stats.pending}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={openList} className="bg-blue-600 text-white px-4 py-2 rounded">View List</button>
        <button onClick={exportExcel} className="bg-green-600 text-white px-4 py-2 rounded">Excel</button>
        <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded">PDF</button>
      </div>
      {open && (
        <div className="border p-4 rounded">
          {loading ? <p>Loading...</p> : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr><th>#</th><th>Student</th><th>Score</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.map((a, i) => (
                  <tr key={i} className="text-center border-t">
                    <td>{i + 1}</td><td>{a.student_name}</td><td>{a.score}</td><td>{a.status}</td>
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