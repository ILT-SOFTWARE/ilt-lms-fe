"use client";
import { useState, useEffect } from "react";
import BankForm from "./BankForm";
import BankTable from "./BankTable";
import api from "@/app/services/api";

export interface BankAccount {
  _id?: string;
  bank_account_id: number;
  bank_name: string;
  branch: string;
  account_number: string;
  holder_name: string;
  initial_balance: number;
  total_balance: number;
  pending_balance: number;
  status: string;
}

export default function BankAccountPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [editData, setEditData] = useState<BankAccount | null>(null);

  useEffect(() => { loadAccounts(); }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/bank-accounts");
      setAccounts(res.data.data ?? []);
    } catch (e) { console.error(e); }
  };

  const addAccount = async (data: BankAccount) => {
    try {
      await api.post("/bank-accounts", data);
      loadAccounts();
    } catch (e) { console.error(e); }
  };

  const updateAccount = async (data: BankAccount) => {
    try {
      await api.put(`/bank-accounts/${editData?._id}`, data);
      setEditData(null);
      loadAccounts();
    } catch (e) { console.error(e); }
  };

  const toggleStatus = async (id: number) => {
    try {
      const item = accounts.find((a) => a.bank_account_id === id);
      if (!item) return;
      await api.put(`/bank-accounts/${item._id}`, {
        ...item,
        status: item.status === "Active" ? "Inactive" : "Active",
      });
      loadAccounts();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Institute Bank Account Management</h1>
      <BankForm editData={editData} onAdd={addAccount} onUpdate={updateAccount} onCancel={() => setEditData(null)} />
      <BankTable data={accounts} onEdit={setEditData} onToggle={toggleStatus} />
    </div>
  );
}