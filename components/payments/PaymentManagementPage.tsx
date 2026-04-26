"use client";
import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";
import PaymentTable from "./PaymentTable";
import api from "@/app/services/api";

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [editingData, setEditingData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [ps, st, co, ba] = await Promise.all([
        api.get("/payments"),
        api.get("/students"),
        api.get("/courses"),
        api.get("/bank-accounts"),
      ]);
      setPayments(ps.data.data ?? []);

      // Students from backend
      setStudents(st.data.data?.map((s: any) => ({
        id: s._id,
        name: s.full_name,
      })) ?? []);

      // Courses from backend
      setCourses(co.data.data?.map((c: any) => ({
        id: c._id,
        name: c.course_name,
        fee: c.course_fee,
      })) ?? []);

      // Bank accounts from backend
      setBankAccounts(ba.data.data?.map((b: any) => ({
        id: b._id,
        name: `${b.bank_name} - ${b.account_number}`,
      })) ?? []);

    } catch (e) { console.error(e); }
  };

  const savePayment = async (data: any) => {
    try {
      if (editingData) {
        await api.put(`/payments/${editingData._id}`, data);
        setEditingData(null);
      } else {
        await api.post("/payments", data);
      }
      loadAll();
    } catch (e) { console.error(e); }
  };

  const toggleStatus = async (id: string) => {
    try {
      const item = payments.find((p) => p._id === id);
      if (!item) return;
      await api.put(`/payments/${id}`, {
        ...item,
        status: item.status === "Paid" ? "Pending" : "Paid",
      });
      loadAll();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Payment Management</h1>
      <PaymentForm
        students={students}
        courses={courses}
        bankAccounts={bankAccounts}
        editData={editingData}
        onSave={savePayment}
        onCancel={() => setEditingData(null)}
      />
      <PaymentTable
        data={payments}
        onEdit={setEditingData}
        onToggle={toggleStatus}
      />
    </div>
  );
}