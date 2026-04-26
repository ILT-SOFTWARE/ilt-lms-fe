"use client";
import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function PaymentManagementReport() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    ReportsManagment.getPayments()
      .then((res) => setPayments(res?.data?.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Payment Report</h1>
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr><th>#</th><th>Student</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i} className="text-center border-t">
              <td>{i + 1}</td><td>{p.student}</td><td>{p.amount}</td><td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}