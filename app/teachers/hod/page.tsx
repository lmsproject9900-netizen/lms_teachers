"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HODDashboard() {
  const router = useRouter();
  const [hod, setHod] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("teacher");

    if (!stored) {
      router.push("/");
    } else {
      const user = JSON.parse(stored);

      if (user.role !== "hod") {
        router.push("/teachers/dashboard");
      } else {
        setHod(user);
      }
    }
  }, [router]);

  if (!hod) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      {/* 🔷 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-lg shadow-md">
        <h1 className="text-xl font-bold">HOD Dashboard</h1>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <span className="cursor-pointer hover:text-yellow-300">Teachers</span>
          <span className="cursor-pointer hover:text-yellow-300">Attendance</span>
          <span className="cursor-pointer hover:text-yellow-300">Results</span>
          <span className="cursor-pointer hover:text-yellow-300">Notices</span>
          <span className="cursor-pointer hover:text-yellow-300">Profile</span>
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

      {/* 🔷 Welcome */}
      <div className="p-6">
        <h2 className="text-3xl font-bold">
          Welcome, {hod.name} 👋
        </h2>
        <p className="text-lg mt-1 uppercase">
          Role: HOD
        </p>

        <p className="mt-4 italic text-yellow-200">
          "Leadership is not about being in charge. It is about taking care of those in your charge."
        </p>
      </div>

      {/* 🔷 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-10">

        {/* Teachers */}
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">👨‍🏫 Teachers</h2>
          <p>Manage all teachers</p>
          <button className="mt-3 bg-blue-500 px-4 py-2 rounded-lg">
            View Teachers
          </button>
        </div>

        {/* Attendance */}
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">📊 Department Attendance</h2>
          <p>Overall: 85%</p>
          <button className="mt-3 bg-green-500 px-4 py-2 rounded-lg">
            View Details
          </button>
        </div>

        {/* Results */}
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">📈 Subject Results</h2>
          <p>View all subjects performance</p>
          <button className="mt-3 bg-purple-500 px-4 py-2 rounded-lg">
            View Results
          </button>
        </div>

        {/* Notices */}
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">📢 Notices</h2>
          <p>Send notices to teachers & students</p>
          <button className="mt-3 bg-yellow-500 px-4 py-2 rounded-lg">
            Create Notice
          </button>
        </div>

        {/* Department Performance */}
        <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-lg shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">🏆 Department %</h2>
          <p>Overall Performance: 78%</p>
        </div>

      </div>
    </div>
  );
}