"use client";

import { Lightbulb, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-teal-50 flex items-center justify-between px-8 shadow-sm">
      <Lightbulb className="text-teal-700" />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold">Admin</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <User className="text-teal-700" />
        </div>
      </div>
    </header>
  );
}