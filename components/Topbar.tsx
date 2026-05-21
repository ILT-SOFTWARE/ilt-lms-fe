"use client";

import { Menu, User } from "lucide-react";

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {
  return (
    <header className="h-16 md:h-20 bg-teal-50 flex items-center justify-between px-4 md:px-8 shadow-sm border-b border-gray-200">
      {/* Left: Hamburger Menu */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 hover:bg-gray-200 rounded-md transition"
      >
        <Menu className="text-teal-700" size={24} />
      </button>
      <div className="hidden lg:block" /> {/* Spacer for desktop */}
      {/* Right: User Info */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-sm md:text-base text-gray-800">
            Admin
          </p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-300 shadow-sm">
          <User className="text-teal-700" size={20} />
        </div>
      </div>
    </header>
  );
}
