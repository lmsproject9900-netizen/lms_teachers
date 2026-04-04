"use client";

import { useRouter } from "next/navigation";
import { User, Users, BookOpen, LogOut } from "lucide-react";

export default function Header({ teacher }: any) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left Side - Logo / Welcome */}
        <div>
          <h1 className="text-2xl font-bold">
            LMS Teacher Panel
          </h1>
          <p className="text-sm text-indigo-100">
            Welcome, {teacher?.name}
          </p>
        </div>

        {/* Right Side - Nav Items */}
        <div className="flex items-center gap-6">

          <button
            onClick={() => router.push("/teachers")}
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => router.push("/attendance")}
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <User className="w-5 h-5" />
            <span>Attendance</span>
          </button>

          <button
            onClick={() => router.push("/students")}
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <Users className="w-5 h-5" />
            <span>Students</span>
          </button>

          <button
            onClick={() => router.push("/subjects")}
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <BookOpen className="w-5 h-5" />
            <span>Subjects</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>

        </div>
      </div>
    </div>
  );
}