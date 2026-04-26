"use client";
import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function CourseReport() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    ReportsManagment.getCourses()
      .then((res) => setCourses(res?.data?.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Course Report</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {courses.map((c, i) => (
          <div key={i} className="p-4 border rounded">
            <h2 className="font-bold">{c.course_name}</h2>
            <p>{c.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}