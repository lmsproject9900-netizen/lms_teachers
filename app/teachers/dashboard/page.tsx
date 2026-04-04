"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("teacher");

    if (!stored) {
      router.push("/"); // redirect to login if not logged in
    } else {
      setTeacher(JSON.parse(stored));
    }
  }, [router]);

  if (!teacher) return null;

  // Function to handle navigation
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">

      {/* 🔷 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-lg shadow-md">
        <h1 className="text-xl font-bold">LMS Dashboard</h1>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/attendance")}
          >
            Attendance
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/next-class")}
          >
            Next Class
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/results")}
          >
            Result
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/notices")}
          >
            Notice
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/timetable")}
          >
            Timetable
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/subjects")}
          >
            Subjects
          </span>
          <span
            className="cursor-pointer hover:text-yellow-300"
            onClick={() => navigateTo("/profile")}
          >
            Profile
          </span>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("teacher");
            router.push("/");
          }}
          className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* 🔷 Welcome Section */}
      <div className="p-6">
        <h2 className="text-3xl font-bold">Welcome, {teacher.name} 👋</h2>
        <p className="text-lg mt-1 capitalize">Role: {teacher.role}</p>
        <p className="mt-4 italic text-yellow-200">
          "A teacher affects eternity; they can never tell where their influence stops."
        </p>
      </div>

      {/* 🔷 Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">

        {/* Next Class */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/next-class")}
        >
          <h2 className="text-xl font-semibold mb-2">📅 Next Class</h2>
          <p>AI - Room 204</p>
          <p className="text-sm text-gray-200 mt-1">10:00 AM</p>
        </div>

        {/* Attendance */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/attendance")}
        >
          <h2 className="text-xl font-semibold mb-2">✅ Attendance</h2>
          <p className="mt-3">Take Attendance</p>
        </div>

        {/* Timetable */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/timetable")}
        >
          <h2 className="text-xl font-semibold mb-2">📊 Timetable</h2>
          <p className="mt-3">View Timetable</p>
        </div>

        {/* Subjects */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/subjects")}
        >
          <h2 className="text-xl font-semibold mb-2">📚 Subjects</h2>
          <p>AI, ML, Data Science</p>
        </div>

        {/* Notices */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/notices")}
        >
          <h2 className="text-xl font-semibold mb-2">📢 Notices</h2>
          <p>No new notices</p>
        </div>

        {/* Profile */}
        <div
          className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => navigateTo("/profile")}
        >
          <h2 className="text-xl font-semibold mb-2">👤 Profile</h2>
          <p>View and edit profile</p>
        </div>

      </div>
    </div>
  );
}