"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  Banknote,
  ClipboardEdit,
  CheckSquare,
  CreditCard,
  BarChart3,
  X,
} from "lucide-react";
import Image from "next/image";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Students Management", path: "/students-management", icon: Users },
  {
    name: "Instructors Management",
    path: "/instructors-management",
    icon: UserCog,
  },
  { name: "Courses Management", path: "/courses-management", icon: BookOpen },
  {
    name: "Institute Bank Account Management",
    path: "/bank-accounts",
    icon: Banknote,
  },
  {
    name: "Assessment Creation Management",
    path: "/assessment-creation",
    icon: ClipboardEdit,
  },
  {
    name: "Assessment Evaluation Management",
    path: "/assessment-evaluation",
    icon: CheckSquare,
  },
  {
    name: "Student Payment Management",
    path: "/student-payments",
    icon: CreditCard,
  },
  { name: "Reports", path: "/reports", icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] xl:w-[300px] min-w-[280px] h-screen sticky top-0 bg-[#0d3b2e] text-white flex-col shrink-0 overflow-y-auto border-r border-[#1a5c45]">
        <div className="h-6" />
        <div className="flex items-center pl-5 gap-3 px-6 py-5 border-b border-[#1a5c45]">
          <Image
            src="/ilt.jpeg"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-full border-2 border-white shrink-0"
          />
          <span className="text-[15px] font-semibold tracking-wide">
            LMS Admin
          </span>
        </div>
        <div className="h-12" />
        <nav className="flex flex-col gap-4 px-3">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center pl-4 gap-3 px-4 py-3 text-[14px] rounded-md transition-colors ${
                  active
                    ? "bg-teal-500 text-white font-medium"
                    : "text-gray-300 hover:bg-[#1a5c45] hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="leading-snug">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] bg-[#0d3b2e] text-white flex flex-col shrink-0 overflow-y-auto z-40 transform transition-transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pl-5 gap-3 px-6 py-5 border-b border-[#1a5c45]">
          <div className="flex items-center gap-3">
            <Image
              src="/ilt.jpeg"
              alt="Logo"
              width={42}
              height={42}
              className="rounded-full border-2 border-white shrink-0"
            />
            <span className="text-[15px] font-semibold tracking-wide">
              LMS Admin
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-[#1a5c45] rounded"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-3 py-6">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center pl-4 gap-3 px-4 py-3 text-[14px] rounded-md transition-colors ${
                  active
                    ? "bg-teal-500 text-white font-medium"
                    : "text-gray-300 hover:bg-[#1a5c45] hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="leading-snug">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
