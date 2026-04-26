"use client";
import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function StudentReport() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    ReportsManagment.getStudents()
      .then((res) => setStudents(res?.data?.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Student Report</h1>
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr><th>#</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="text-center border-t">
              <td>{i + 1}</td><td>{s.name}</td><td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}