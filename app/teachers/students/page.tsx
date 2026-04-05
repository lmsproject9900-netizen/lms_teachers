'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
interface Student {  
  usn: string;
  name: string;
  mobile: string | null;
  email: string | null;
  department: string | null;
  semester: number | null;
  total_subjects: number | null;
  passed_subjects: number | null;
  failed_subjects: number | null;
  attendence_status: boolean | null;
  created_at: string;
}

interface Teacher {
  id: string;
  name: string;
  mobile: string | null;
  email: string | null;
  department: string | null;
  subjects: string[] | null;
  class_coordinator: string | null;
  role: string | null;
}

interface TeacherSubject {
  name: string;
  semester: number;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubject[]>([]);

  useEffect(() => {
    fetchTeacherAndStudents();
  }, []);

  const fetchTeacherAndStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current logged in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) throw new Error('No user logged in');

      // Fetch teacher details using email
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .select('*')
        .eq('email', user.email)
        .single();

      if (teacherError) {
        console.error('Teacher fetch error:', teacherError);
        throw new Error('Teacher record not found');
      }

      setTeacher(teacherData);

      // Parse teacher subjects to extract semester information
      let subjectsList: TeacherSubject[] = [];
      
      if (teacherData.subjects && Array.isArray(teacherData.subjects) && teacherData.subjects.length > 0) {
        subjectsList = teacherData.subjects.map((subject: string) => {
          // Assuming subject format like "Mathematics (Sem 3)" or "Physics-Sem5"
          const semesterMatch = subject.match(/Sem\s*(\d+)/i);
          const semester = semesterMatch ? parseInt(semesterMatch[1]) : 1;
          return {
            name: subject,
            semester: semester
          };
        });
        setTeacherSubjects(subjectsList);
      }

      // Get unique semesters from teacher's subjects
      const teacherSemesters = [...new Set(subjectsList.map(ts => ts.semester))];
      
      // Fetch students for the semesters the teacher handles
      let query = supabase.from('students').select('*');
      
      if (teacherSemesters.length > 0) {
        query = query.in('semester', teacherSemesters);
      }
      
      const { data: studentsData, error: studentsError } = await query.order('name', { ascending: true });

      if (studentsError) throw studentsError;
      
      setStudents(studentsData || []);
      setFilteredStudents(studentsData || []);

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search and semester
  useEffect(() => {
    let filtered = students;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.usn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by semester
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(student => student.semester === selectedSemester);
    }
    
    setFilteredStudents(filtered);
  }, [searchTerm, selectedSemester, students]);

  const getUniqueSemesters = () => {
    const semesters = new Set<number>();
    students.forEach(student => {
      if (student.semester) semesters.add(student.semester);
    });
    return Array.from(semesters).sort();
  };

  const StudentDetailsModal = ({ student, onClose }: { student: Student; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">USN</label>
              <p className="text-lg text-gray-800">{student.usn}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <p className="text-lg text-gray-800 font-medium">{student.name}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Department</label>
              <p className="text-lg text-gray-800">{student.department || 'Not specified'}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Semester</label>
              <p className="text-lg text-gray-800">{student.semester || 'Not specified'}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Mobile Number</label>
              <p className="text-lg text-gray-800">{student.mobile || 'Not provided'}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <p className="text-lg text-gray-800">{student.email || 'Not provided'}</p>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Academic Performance</label>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Total Subjects:</span> {student.total_subjects || 0}</p>
                <p><span className="font-medium text-green-600">Passed Subjects:</span> {student.passed_subjects || 0}</p>
                <p><span className="font-medium text-red-600">Failed Subjects:</span> {student.failed_subjects || 0}</p>
                {student.total_subjects && student.total_subjects > 0 && (
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${((student.passed_subjects || 0) / student.total_subjects) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Pass Rate: {Math.round(((student.passed_subjects || 0) / student.total_subjects) * 100)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600">Attendance Status</label>
              <p className="text-lg">
                {student.attendence_status ? 
                  <span className="text-green-600 font-medium">Present</span> : 
                  <span className="text-red-600 font-medium">Absent</span>
                }
              </p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600">Registration Date</label>
              <p className="text-lg text-gray-800">
                {new Date(student.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher and students data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md w-full">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Teacher Information Section */}
      {teacher && (
        <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Teacher Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-90">Name</p>
                <p className="text-lg font-semibold">{teacher.name}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Department</p>
                <p className="text-lg font-semibold">{teacher.department || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Email</p>
                <p className="text-lg font-semibold">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Role</p>
                <p className="text-lg font-semibold">{teacher.role || 'Teacher'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subjects Handled Section */}
      {teacherSubjects.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b">
            <h3 className="text-xl font-bold text-blue-900">Subjects Handled</h3>
            <p className="text-blue-700 text-sm mt-1">Total Subjects: {teacherSubjects.length}</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {teacherSubjects.map((subject, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{subject.name}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Sem {subject.semester}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Section Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Students List</h1>
        <p className="text-gray-600">
          Showing students from semesters you are handling
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg opacity-90">Total Students</h3>
          <p className="text-3xl font-bold mt-2">{students.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg opacity-90">Subjects Handling</h3>
          <p className="text-3xl font-bold mt-2">{teacherSubjects.length}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg opacity-90">Present Today</h3>
          <p className="text-3xl font-bold mt-2">
            {students.filter(s => s.attendence_status === true).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
            <input
              type="text"
              placeholder="Search by name or USN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Semesters</option>
              {getUniqueSemesters().map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No students found for the selected criteria
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.usn} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.usn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.department || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Sem {student.semester}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.mobile || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.total_subjects ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-medium">{student.passed_subjects || 0}</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-600">{student.total_subjects}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.attendence_status ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Present
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Absent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentDetailsModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
}