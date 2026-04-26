"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, UserCog, BookOpen,
  Banknote, ClipboardEdit, CheckSquare, CreditCard, BarChart3,
} from "lucide-react";
import Image from "next/image";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Students Management", path: "/students-management", icon: Users },
  { name: "Instructors Management", path: "/instructors-management", icon: UserCog },
  { name: "Courses Management", path: "/courses-management", icon: BookOpen },
  { name: "Institute Bank Account Management", path: "/bank-accounts", icon: Banknote },
  { name: "Assessment Creation Management", path: "/assessment-creation", icon: ClipboardEdit },
  { name: "Assessment Evaluation Management", path: "/assessment-evaluation", icon: CheckSquare },
  { name: "Student Payment Management", path: "/student-payments", icon: CreditCard },
  { name: "Reports", path: "/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[300px] min-w-[300px] h-screen sticky top-0 bg-[#0d3b2e] text-white flex flex-col shrink-0 overflow-y-auto">
      <div className="h-6" />
      <div className="flex items-center pl-5 gap-3 px-6 py-5 border-b border-[#1a5c45]">
        <Image src="/ilt.jpeg" alt="Logo" width={42} height={42} className="rounded-full border-2 border-white shrink-0" />
        <span className="text-[15px] font-semibold tracking-wide">LMS Admin</span>
      </div>
      <div className="h-12" />
      <nav className="flex flex-col gap-6 px-3">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}
              className={`flex items-center pl-5 gap-3 px-4 py-3 text-[14px] rounded-md transition-colors ${
                active ? "bg-teal-500 text-white font-medium" : "text-gray-300 hover:bg-[#1a5c45] hover:text-white"
              }`}
            >
              <Icon size={17} className="shrink-0" />
              <span className="leading-snug">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}