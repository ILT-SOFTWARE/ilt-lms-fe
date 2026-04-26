"use client";
import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function InstructorReport() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    ReportsManagment.getInstructors()
      .then((res) => setData(res?.data?.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Instructor Report</h1>
      <ul className="mt-4 space-y-2">
        {data.map((item, idx) => (
          <li key={idx} className="p-3 border rounded">
            {item.name} - {item.department}
          </li>
        ))}
      </ul>
    </div>
  );
}