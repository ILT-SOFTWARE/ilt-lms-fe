"use client";

import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  totalStudents: number;
};

export default function DashboardStudentCard({ totalStudents }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="text-gray-600 font-semibold">Total Students</h3>

      <div className="flex items-center justify-between mt-4">
        <Users className="text-blue-500" size={40} />
        <div className="text-3xl font-bold">{totalStudents}</div>
      </div>

      <button
        onClick={() => router.push("/students-management")}
        className="mt-5 text-sm text-blue-600 hover:underline"
      >
        View →
      </button>
    </div>
  );
}