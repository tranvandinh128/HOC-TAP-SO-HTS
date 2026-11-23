
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function AdminLayout({
  children,
  title = "Khu vực quản trị HTS",
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-bold text-slate-800">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Hệ thống quản lý nền tảng HỌC TẬP SỐ
          </p>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row">
        <div className="w-full shrink-0 md:w-64">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-5 md:p-7">
          {children}
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white px-5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HỌC TẬP SỐ (HTS)
      </footer>
    </div>
  );
}
