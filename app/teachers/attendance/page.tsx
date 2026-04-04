"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AttendancePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setStudents(data || []);

    let p = 0;
    let a = 0;

    data?.forEach((s: any) => {
      if (s.status === "present") p++;
      else a++;
    });

    setPresent(p);
    setAbsent(a);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Attendance Page</h1>

      <h2>Present: {present}</h2>
      <h2>Absent: {absent}</h2>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.student_id}</td>
              <td>{s.student_name}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}