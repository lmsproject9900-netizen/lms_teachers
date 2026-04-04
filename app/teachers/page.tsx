"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react";

import Header from "../../app/teachers/components/header";
import Footer from "../../app/teachers/components/footer";

export default function TeachersPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teacherData = localStorage.getItem("teacher");

    if (!teacherData) {
      router.push("/");
      return;
    }

    try {
      const parsedTeacher = JSON.parse(teacherData);
      setTeacher(parsedTeacher);
    } catch (error) {
      console.error("Error parsing teacher data:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!teacher) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      
      {/* Header */}
      <Header teacher={teacher} />

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-6 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">24</span>
            </div>
            <h3 className="text-gray-600">Total Students</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">4</span>
            </div>
            <h3 className="text-gray-600">Active Courses</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>
            <h3 className="text-gray-600">Classes Today</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold">98%</span>
            </div>
            <h3 className="text-gray-600">Attendance Rate</h3>
          </div>

        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Upcoming Classes</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {[
                { subject: "Mathematics", time: "10:00 AM", room: "Room 201", students: 28 },
                { subject: "Physics", time: "2:00 PM", room: "Lab 3", students: 24 },
                { subject: "Computer Science", time: "4:00 PM", room: "Lab 1", students: 30 }
              ].map((cls, idx) => (
                <div key={idx} className="flex justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{cls.subject}</h3>
                    <p className="text-sm text-gray-500">{cls.time} • {cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{cls.students} students</p>
                    <button className="text-indigo-600 text-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>

            <div className="space-y-3">

              <button
                onClick={() => router.push("/students")}
                className="w-full flex justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
              >
                <span className="flex gap-2 items-center">
                  <Users className="w-5 h-5 text-indigo-600" />
                  View Students
                </span>
                <ChevronRight />
              </button>

              <button
                onClick={() => router.push("/courses")}
                className="w-full flex justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
              >
                <span className="flex gap-2 items-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Manage Courses
                </span>
                <ChevronRight />
              </button>

              <button
                onClick={() => router.push("/attendance")}
                className="w-full flex justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
              >
                <span className="flex gap-2 items-center">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Take Attendance
                </span>
                <ChevronRight />
              </button>

              <button
                onClick={() => router.push("/grades")}
                className="w-full flex justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
              >
                <span className="flex gap-2 items-center">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Grade Assignments
                </span>
                <ChevronRight />
              </button>

            </div>
          </div>

        </div>

        {/* Teacher Info */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Teacher Information</h3>
          <p>
            Email: {teacher.email || "N/A"} • ID: {teacher.id}
          </p>
        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}