"use client";
import React, { useState } from "react";

interface loginType {
  checkLogIn: () => void;
}

export default function Login({checkLogIn}:loginType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: username,
            password: password
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Server is down");
        }

        if (res.ok) {
          checkLogIn()
        }
      } catch (error) {
        alert("Unable to Login!");
        console.log(error)
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-white font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 
                         focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 
                         focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 
                       text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-all duration-200"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
