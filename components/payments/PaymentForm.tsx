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
    <div className="bg-white shadow rounded-lg md:rounded-xl p-4 md:p-6 mb-6">
      <h2 className="font-bold text-lg md:text-xl mb-4 md:mb-6">{editData ? "Edit Payment" : "Add Payment"}</h2>
      
      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        <select 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base" 
          value={form.student}
          onChange={(e) => setForm({ ...form, student: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s: any) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <select 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base" 
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((c: any) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <input 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base" 
          placeholder="Paid Amount"
          value={form.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />

        <input 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base" 
          placeholder="Total Amount"
          value={form.total}
          onChange={(e) => handleTotalChange(e.target.value)}
        />

        <select 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base" 
          value={form.bank}
          onChange={(e) => setForm({ ...form, bank: e.target.value })}
        >
          <option value="">Select Bank</option>
          {bankAccounts.map((b: any) => (
            <option key={b.id} value={b.name}>{b.name}</option>
          ))}
        </select>

        <input 
          type="date" 
          className="border border-gray-300 p-2 md:p-3 rounded text-sm md:text-base"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      {/* Status Display - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 md:mb-6">
        <span className="text-sm md:text-base text-gray-600 font-medium">Status:</span>
        <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${
          form.status === "Paid" ? "bg-green-500" : "bg-orange-400"
        }`}>
          {form.status}
        </span>
      </div>

      {/* Buttons - Responsive */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={submit} 
          className="w-full sm:w-auto bg-teal-700 text-white px-5 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-teal-800 transition"
        >
          {editData ? "Update Payment" : "Add Payment"}
        </button>
        {editData && (
          <button 
            onClick={onCancel} 
            className="w-full sm:w-auto border border-gray-300 px-5 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}