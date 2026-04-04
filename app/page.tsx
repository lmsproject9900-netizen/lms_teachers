
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ass.prof");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("name", name.trim())
        .eq("password", password.trim())
        .eq("role", role)
        .single();

      if (error || !data) {
        setError("Invalid name, password, or role");
        setLoading(false);
        return;
      }

      // Save session
      localStorage.setItem("teacher", JSON.stringify(data));

      // Redirect based on role
      if (role === "hod") {
        router.push("/teachers/hod");
      } else if (role === "principal") {
        router.push("/teachers/principal");
      } else if (role === "ass.prof") {
        router.push("/teachers/dashboard");
      }

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      
      <div className="w-[360px] p-8 rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30">
        
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          LMS Login
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 mb-3 rounded-xl bg-white/30 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-3 rounded-xl bg-white/30 text-white placeholder-white outline-none focus:ring-2 focus:ring-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role */}
        <select
          className="w-full p-3 mb-4 rounded-xl bg-white/30 text-white outline-none focus:ring-2 focus:ring-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ass.prof" className="text-black">
            Assistant Professor
          </option>
          <option value="hod" className="text-black">
            HOD
          </option>
          <option value="principal" className="text-black">
            Principal
          </option>
        </select>

        {/* Error */}
        {error && (
          <p className="text-red-200 text-sm text-center mb-3">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-200 transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/80 text-sm mt-4">
          Select your role and login
        </p>
      </div>
    </div>
  );
}
