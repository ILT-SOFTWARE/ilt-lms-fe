"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  totalPaidAmount: number | string;
};

export default function DashboardPaymentCard({
  title = "Total Paid Amount",
  totalPaidAmount,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col justify-between">
      <h3 className="text-gray-600 font-semibold">{title}</h3>

      <div className="flex items-center justify-between mt-4">
        <div className="text-3xl font-bold text-teal-600">
          Rs {totalPaidAmount}
        </div>
      </div>

      <button
        onClick={() => router.push("/student-payments")}
        className="mt-5 flex items-center gap-2 text-sm text-teal-600 hover:underline"
      >
        View <ArrowRight size={16} />
      </button>
    </div>
  );
}
