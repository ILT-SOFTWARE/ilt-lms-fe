"use client";
import { useEffect, useState } from "react";

export default function PaymentForm({
  students, courses, bankAccounts, editData, onSave, onCancel,
}: any) {
  const [form, setForm] = useState({
    student: "", course: "", amount: "", total: "", bank: "", date: "", status: "Pending",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // Auto calculate status when amount or total changes
  const handleAmountChange = (amount: string) => {
    const paid = Number(amount);
    const total = Number(form.total);
    const status = total > 0 && paid >= total ? "Paid" : "Pending";
    setForm({ ...form, amount, status });
  };

  const handleTotalChange = (total: string) => {
    const paid = Number(form.amount);
    const totalNum = Number(total);
    const status = totalNum > 0 && paid >= totalNum ? "Paid" : "Pending";
    setForm({ ...form, total, status });
  };

  const submit = () => {
    onSave(form);
    setForm({ student: "", course: "", amount: "", total: "", bank: "", date: "", status: "Pending" });
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">{editData ? "Edit Payment" : "Add Payment"}</h2>
      <div className="grid grid-cols-3 gap-4">

        <select className="border p-2 rounded" value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}>
          <option value="">Select Student</option>
          {students.map((s: any) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <select className="border p-2 rounded" value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}>
          <option value="">Select Course</option>
          {courses.map((c: any) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <input className="border p-2 rounded" placeholder="Paid Amount"
          value={form.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />

        <input className="border p-2 rounded" placeholder="Total Amount"
          value={form.total}
          onChange={(e) => handleTotalChange(e.target.value)}
        />

        <select className="border p-2 rounded" value={form.bank}
          onChange={(e) => setForm({ ...form, bank: e.target.value })}>
          <option value="">Select Bank</option>
          {bankAccounts.map((b: any) => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>

        <input type="date" className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* Show calculated status */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Status:</span>
          <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${
            form.status === "Paid" ? "bg-green-500" : "bg-orange-400"
          }`}>
            {form.status}
          </span>
        </div>

      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={submit} className="bg-teal-700 text-white px-5 py-2 rounded">
          {editData ? "Update Payment" : "Add Payment"}
        </button>
        {editData && (
          <button onClick={onCancel} className="border px-5 py-2 rounded">Cancel</button>
        )}
      </div>
    </div>
  );
}