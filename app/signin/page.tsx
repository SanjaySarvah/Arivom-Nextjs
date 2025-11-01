"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost/newsapi/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save user info in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user_id", data.user.id);
          localStorage.setItem("user_name", data.user.name);
          localStorage.setItem("user_email", data.user.email);
        }

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/"); // Redirect to homepage or dashboard
        }, 2000);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Sign in to continue to your account
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium mb-4 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-medium mb-4 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition 
                bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition 
                bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-lg 
              hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 transition"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
