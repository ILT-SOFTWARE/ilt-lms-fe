"use client";
import { useEffect, useState } from "react";
import ReportsManagment from "@/components/reports/ReportManagment";

export default function BankAccountReport() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    ReportsManagment.getBankAccounts()
      .then((res) => setData(res?.data?.data ?? []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Bank Account Report</h1>
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr><th>#</th><th>Account Name</th><th>Bank</th><th>Number</th></tr>
        </thead>
        <tbody>
          {data.map((a, i) => (
            <tr key={i} className="text-center border-t">
              <td>{i + 1}</td><td>{a.account_name}</td><td>{a.bank_name}</td><td>{a.account_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}