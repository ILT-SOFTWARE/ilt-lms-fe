"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  totalCourses: number;
  loading?: boolean;
  error?: boolean;
};

export default function CourseManagementDashboard({
  totalCourses,
  loading,
  error,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-gray-600 font-semibold">Total Courses</h3>

      <div className="flex items-center justify-between mt-4">
        <BookOpen className="text-green-500" size={40} />

        {loading ? (
          <div className="animate-pulse text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-500">—</div>
        ) : (
          <div className="text-3xl font-bold">{totalCourses}</div>
        )}
      </div>

      <button
        onClick={() => router.push("/courses-management")}
        className="mt-5 text-sm text-green-600 hover:underline"
      >
        View →
      </button>
    </div>
  );
}
