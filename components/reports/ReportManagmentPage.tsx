"use client";

import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";
import AssessmentCreationReport from "@/components/reports/AssesmentCreationReport";
import AssessmentEvaluationReport from "@/components/reports/AssesmentEvaluationReport";
import BankAccountReport from "@/components/reports/BankAccountReport";
import CourseReport from "@/components/reports/CourseReport";
import InstructorReport from "@/components/reports/InstructorReport";
import PaymentManagementReport from "@/components/reports/PaymentManagmentReport";
import StudentReport from "@/components/reports/StudentReport";

export default function ReportManagmentPage() {
  const [assessmentStats, setAssessmentStats] = useState({ total: 0, published: 0, expired: 0 });
  const [evaluationStats, setEvaluationStats] = useState({ total: 0, evaluated: 0, pending: 0 });
  const [students, setStudents] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);

  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    ReportsManagment.getTotalAssessments().then((r) =>
      setAssessmentStats((p) => ({ ...p, total: r.data.total_assessments }))
    );
    ReportsManagment.getPublishedAssessments().then((r) =>
      setAssessmentStats((p) => ({ ...p, published: r.data.published_assessments }))
    );
    ReportsManagment.getExpiredAssessments().then((r) =>
      setAssessmentStats((p) => ({ ...p, expired: r.data.expired_assessments }))
    );
    ReportsManagment.getAssessmentEvaluationStats().then((r) =>
      setEvaluationStats(r.data)
    );
    ReportsManagment.getStudents().then((r) => setStudents(r.data.data));
    ReportsManagment.getInstructors().then((r) => setInstructors(r.data.data));
    ReportsManagment.getCourses().then((r) => setCourses(r.data.data));
    ReportsManagment.getPayments().then((r) => setPayments(r.data.data));
    ReportsManagment.getBankAccounts().then((r) => setBankAccounts(r.data.data));
  }, []);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Reports</h1>

      {/* 1. Assessment Creation */}
      <ReportCard
        icon="📋"
        title="Assessment Creation Report"
        subtitle="Showing a real-time overview of assessment schedules."
        stats={[
          { label: "TOTAL ASSESSMENTS", value: assessmentStats.total, color: "bg-purple-600" },
          { label: "PUBLISHED", value: assessmentStats.published, color: "bg-green-500" },
          { label: "EXPIRED", value: assessmentStats.expired, color: "bg-orange-400" },
        ]}
        onView={() => toggle("assessment-creation")}
        viewLabel="Assessment List"
        returnLabel="Return Assessment Report"
      >
        {openSection === "assessment-creation" && <AssessmentCreationReport />}
      </ReportCard>

      {/* 2. Assessment Evaluation */}
      <ReportCard
        icon="📝"
        title="Assessment Evaluation Report"
        subtitle="Showing a real-time overview of assessment evaluations."
        stats={[
          { label: "TOTAL", value: evaluationStats.total, color: "bg-purple-600" },
          { label: "EVALUATED", value: evaluationStats.evaluated, color: "bg-green-500" },
          { label: "PENDING", value: evaluationStats.pending, color: "bg-orange-400" },
        ]}
        onView={() => toggle("assessment-evaluation")}
        viewLabel="Evaluation List"
        returnLabel="Return Evaluation Report"
      >
        {openSection === "assessment-evaluation" && <AssessmentEvaluationReport />}
      </ReportCard>

      {/* 3. Instructor */}
      <ReportCard
        icon="👨‍🏫"
        title="Instructor Report"
        subtitle="Showing a real-time overview of instructors and status."
        stats={[
          { label: "TOTAL INSTRUCTORS", value: instructors.length, color: "bg-purple-600" },
          { label: "ACTIVE INSTRUCTORS", value: instructors.length, color: "bg-green-500" },
          { label: "INACTIVE INSTRUCTORS", value: 0, color: "bg-orange-400" },
        ]}
        onView={() => toggle("instructor")}
        viewLabel="Instructor List"
        returnLabel="Return Instructors Management"
      >
        {openSection === "instructor" && <InstructorReport />}
      </ReportCard>

      {/* 4. Course */}
      <ReportCard
        icon="📚"
        title="Course Management Report"
        subtitle="Showing a real-time overview of course enrollments and status."
        stats={[
          { label: "TOTAL COURSES", value: courses.length, color: "bg-purple-600" },
          { label: "ACTIVE COURSES", value: courses.length, color: "bg-green-500" },
          { label: "INACTIVE COURSES", value: 0, color: "bg-orange-400" },
        ]}
        onView={() => toggle("course")}
        viewLabel="Course List"
        returnLabel="Return Course Management"
      >
        {openSection === "course" && <CourseReport />}
      </ReportCard>

      {/* 5. Student */}
      <ReportCard
        icon="🎓"
        title="Student Report"
        subtitle="Showing a real-time overview of student enrollments."
        stats={[
          { label: "TOTAL STUDENTS", value: students.length, color: "bg-purple-600" },
          { label: "ACTIVE STUDENTS", value: students.length, color: "bg-green-500" },
          { label: "INACTIVE STUDENTS", value: 0, color: "bg-orange-400" },
        ]}
        onView={() => toggle("student")}
        viewLabel="Student List"
        returnLabel="Return Student Management"
      >
        {openSection === "student" && <StudentReport />}
      </ReportCard>

      {/* 6. Payment */}
      <ReportCard
        icon="💳"
        title="Student Payment Report"
        subtitle="Showing a real-time overview of student payments."
        stats={[
          { label: "TOTAL PAYMENTS", value: payments.length, color: "bg-purple-600" },
          { label: "PAID", value: payments.filter((p) => p.status === "Paid").length, color: "bg-green-500" },
          { label: "PENDING", value: payments.filter((p) => p.status === "Pending").length, color: "bg-orange-400" },
        ]}
        onView={() => toggle("payment")}
        viewLabel="Payment List"
        returnLabel="Return Payment Management"
      >
        {openSection === "payment" && <PaymentManagementReport />}
      </ReportCard>

      {/* 7. Bank Account */}
      <ReportCard
        icon="🏦"
        title="Bank Account Report"
        subtitle="Showing a real-time overview of institute bank accounts."
        stats={[
          { label: "TOTAL ACCOUNTS", value: bankAccounts.length, color: "bg-purple-600" },
          { label: "ACTIVE ACCOUNTS", value: bankAccounts.length, color: "bg-green-500" },
          { label: "INACTIVE ACCOUNTS", value: 0, color: "bg-orange-400" },
        ]}
        onView={() => toggle("bank-account")}
        viewLabel="Bank Account List"
        returnLabel="Return Bank Account Management"
      >
        {openSection === "bank-account" && <BankAccountReport />}
      </ReportCard>
    </div>
  );
}

// Reusable Card
function ReportCard({
  icon,
  title,
  subtitle,
  stats,
  onView,
  viewLabel,
  returnLabel,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  stats: { label: string; value: number; color: string }[];
  onView: () => void;
  viewLabel: string;
  returnLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-3xl mb-1">{icon}</div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <span className="flex items-center gap-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
          LIVE
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`${s.color} text-white rounded-xl p-5 flex flex-col items-center justify-center`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide opacity-90 text-center">
              {s.label}
            </p>
            <p className="text-4xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-4 pt-2">
        <button
          onClick={onView}
          className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-teal-800 transition"
        >
          ☰ {viewLabel}
        </button>
        <button
          onClick={onView}
          className="text-teal-700 text-sm font-semibold hover:underline flex items-center gap-1"
        >
          {returnLabel} →
        </button>
      </div>

      {/* Expandable Content */}
      {children && (
        <div className="border-t pt-4 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}