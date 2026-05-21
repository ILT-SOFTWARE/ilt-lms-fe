"use client";

import DashboardPaymentCard from "@/components/AdminDashboard/DashboardPaymentCard";
import DashboardStudentCard from "@/components/AdminDashboard/DashboardStudentCard";
import DashboardInstructorCard from "@/components/AdminDashboard/DashboardInstructorCard";
import CourseManagmentDashboard from "@/components/AdminDashboard/CourseManagmentDashboard";

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardPaymentCard totalPaidAmount={250000} />
        <DashboardStudentCard totalStudents={180} />
        <DashboardInstructorCard totalInstructors={25} />
        <CourseManagmentDashboard totalCourses={12} />
      </div>
    </div>
  );
}