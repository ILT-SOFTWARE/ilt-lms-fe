"use client";

import { useEffect, useState } from "react";
import DashboardPaymentCard from "@/components/AdminDashboard/DashboardPaymentCard";
import DashboardStudentCard from "@/components/AdminDashboard/DashboardStudentCard";
import DashboardInstructorCard from "@/components/AdminDashboard/DashboardInstructorCard";
import CourseManagmentDashboard from "@/components/AdminDashboard/CourseManagmentDashboard";
import api from "@/app/services/api";

export default function DashboardPage() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [students, instructors, courses, payments] = await Promise.all([
          api.get("/students"),
          api.get("/instructors"),
          api.get("/courses"),
          api.get("/payments"),
        ]);
        setTotalStudents(students.data.data?.length ?? 0);
        setTotalInstructors(instructors.data.data?.length ?? 0);
        setTotalCourses(courses.data.data?.length ?? 0);
        const paid = payments.data.data
          ?.filter((p: any) => p.status === "Paid")
          ?.reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0) ?? 0;
        setTotalPaid(paid);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardPaymentCard totalPaidAmount={loading ? "..." : totalPaid} />
        <DashboardStudentCard totalStudents={loading ? 0 : totalStudents} />
        <DashboardInstructorCard totalInstructors={loading ? 0 : totalInstructors} loading={loading} />
        <CourseManagmentDashboard totalCourses={loading ? 0 : totalCourses} loading={loading} />
      </div>
    </div>
  );
}