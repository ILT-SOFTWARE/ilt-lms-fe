"use client";

import { useEffect, useState } from "react";
import { BankAccount } from "./BankAccountPage";

interface Props {
  editData: BankAccount | null;
  onAdd: (data: BankAccount) => void;
  onUpdate: (data: BankAccount) => void;
  onCancel: () => void;
}

export default function BankForm({
  editData,
  onAdd,
  onUpdate,
  onCancel,
}: Props) {
  const [form, setForm] = useState<BankAccount>({
    bank_account_id: 0,
    bank_name: "",
    branch: "",
    account_number: "",
    holder_name: "",
    initial_balance: 0,
    total_balance: 0,
    pending_balance: 0,
    status: "Active",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const submit = () => {
    if (editData) {
      onUpdate(form);
    } else {
      onAdd(form);
    }

    setForm({
      bank_account_id: 0,
      bank_name: "",
      branch: "",
      account_number: "",
      holder_name: "",
      initial_balance: 0,
      total_balance: 0,
      pending_balance: 0,
      status: "Active",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold mb-5">
        {editData ? "Edit Bank Account" : "Create Bank Account"}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          placeholder="Bank Name"
          className="border p-3 rounded"
          value={form.bank_name}
          onChange={(e) =>
            setForm({ ...form, bank_name: e.target.value })
          }
        />

        <input
          placeholder="Branch Name"
          className="border p-3 rounded"
          value={form.branch}
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
        />

        <input
          placeholder="Account Number"
          className="border p-3 rounded"
          value={form.account_number}
          onChange={(e) =>
            setForm({
              ...form,
              account_number: e.target.value,
            })
          }
        />

        <input
          placeholder="Holder Name"
          className="border p-3 rounded"
          value={form.holder_name}
          onChange={(e) =>
            setForm({
              ...form,
              holder_name: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Initial Balance"
          className="border p-3 rounded"
          value={form.initial_balance}
          onChange={(e) =>
            setForm({
              ...form,
              initial_balance: Number(e.target.value),
              total_balance: Number(e.target.value),
            })
          }
        />

        <select
          className="border p-3 rounded"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={submit}
          className="bg-teal-600 text-white px-6 py-2 rounded"
        >
          {editData ? "Update" : "Add"}
        </button>

        {editData && (
          <button
            onClick={onCancel}
            className="border px-6 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}