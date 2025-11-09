import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import api from "../services/api"; // ✅ make sure this file exists
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Activity,
  Shield,
  Wind,
  Leaf,
  TrendingDown,
  MapPin,
  Zap,
  Database,
  BarChart3,
} from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ NEW BACKEND-CONNECTED LOGIN FUNCTION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Store token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isAuthenticated", "true");

      onLogin();
    } catch (error: any) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* 🔹 Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🔸 Main Horizontal Layout */}
      <div className="relative z-10 w-full max-w-[1800px] h-full flex items-center justify-center">
        <div className="grid grid-cols-[1fr_480px] gap-12 w-full items-center">
          {/* 🟢 Left Side - Branding + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-2xl flex items-center justify-center relative">
                <Activity className="h-8 w-8 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-5xl bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  CO₂ Digital Twin
                </h1>
                <p className="text-lg text-blue-200 mt-0.5">
                  Environmental Monitoring • Nagpur City
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[Wind, Leaf, Database, TrendingDown].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl text-white">Demo</p>
                  <p className="text-xs text-blue-200">Metric</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 🔐 Right Side - Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full flex items-center"
          >
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden w-full max-w-[480px]">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
              <div className="p-6">
                <div className="text-center mb-5">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-3 shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-2xl text-white mb-1">Welcome Back</h2>
                  <p className="text-sm text-blue-200">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="text-sm text-blue-100">Email Address</label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <Input
                        type="email"
                        placeholder="admin@nagpur.gov.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 bg-white/10 border border-white/20 text-white placeholder:text-blue-300/50 focus:bg-white/15 focus:border-blue-400/50 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm text-blue-100">Password</label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 h-11 bg-white/10 border border-white/20 text-white placeholder:text-blue-300/50 focus:bg-white/15 focus:border-blue-400/50 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-blue-100 hover:text-white">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/10" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-cyan-400 hover:text-cyan-300">
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white shadow-lg rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity className="h-5 w-5" />
                        </motion.div>
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <span>Sign In to Dashboard →</span>
                    )}
                  </Button>
                </form>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
