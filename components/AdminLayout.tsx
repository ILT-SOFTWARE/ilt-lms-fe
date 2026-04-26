import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
        <Topbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}