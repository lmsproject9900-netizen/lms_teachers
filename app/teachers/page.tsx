"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Users, Calendar, LogOut, Award, Clock, ChevronRight } from "lucide-react";

export default function TeachersPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get teacher data from localStorage
    const teacherData = localStorage.getItem("teacher");
    
    if (!teacherData) {
      // Redirect to login if no teacher data found
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

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    router.push("/");
  };

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

  if (!teacher) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section with Welcome Message */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {teacher.name}! 👋
              </h1>
              <p className="text-indigo-100 text-lg">
                We're glad to have you here. Ready to inspire young minds today?
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">24</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Students</h3>
            <p className="text-sm text-gray-400 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">4</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Courses</h3>
            <p className="text-sm text-gray-400 mt-2">2 new this semester</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">12</span>
            </div>
            <h3 className="text-gray-600 font-medium">Classes Today</h3>
            <p className="text-sm text-gray-400 mt-2">Next class in 30 min</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">98%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Attendance Rate</h3>
            <p className="text-sm text-gray-400 mt-2">Excellent performance</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Classes</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", time: "10:00 AM", room: "Room 201", students: 28 },
                { subject: "Physics", time: "2:00 PM", room: "Lab 3", students: 24 },
                { subject: "Computer Science", time: "4:00 PM", room: "Lab 1", students: 30 }
              ].map((class_, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-800">{class_.subject}</h3>
                    <p className="text-sm text-gray-500">{class_.time} • {class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{class_.students} students</p>
                    <button className="text-indigo-600 text-sm hover:text-indigo-700 mt-1">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">View All Students</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">Manage Courses</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">Take Attendance</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">Grade Assignments</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Teacher Info Card */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Teacher Information</h3>
              <p className="text-indigo-100">
                <span className="font-medium">Email:</span> {teacher.email || "Not provided"} • 
                <span className="font-medium ml-2">ID:</span> {teacher.id}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Senior Faculty</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">5+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
