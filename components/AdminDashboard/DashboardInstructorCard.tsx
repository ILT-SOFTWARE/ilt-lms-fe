"use client";

import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  totalInstructors: number;
  loading?: boolean;
  error?: boolean;
};

export default function DashboardInstructorCard({
  totalInstructors,
  loading,
  error,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-gray-600 font-semibold">Total Instructors</h3>

      <div className="flex items-center justify-between mt-4">
        <GraduationCap className="text-purple-500" size={40} />

        {loading ? (
          <div className="animate-pulse text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-500">—</div>
        ) : (
          <div className="text-3xl font-bold">{totalInstructors}</div>
         )}
      </div>

      <button
        onClick={() => router.push("/instructors-management")}
        className="mt-5 text-sm text-purple-600 hover:underline"
      >
        View →
      </button>
    </div>
  );
}