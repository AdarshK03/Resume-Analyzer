import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">
          <h1 className="text-5xl font-bold">
            Welcome
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Back
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Log in to continue analyzing your resume.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Email */}

            <div>
              <label className="mb-2 block font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none transition focus:border-cyan-400"
              />
            </div>

            {/* Password */}

            <div>
              <div className="mb-2 flex justify-between">
                <label className="font-medium">Password</label>

                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Forgot?
                </button>
              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none transition focus:border-cyan-400"
              />
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 py-4 text-lg font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Divider */}

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-slate-700"></div>

            <p className="mx-4 text-slate-500">OR</p>

            <div className="flex-1 border-t border-slate-700"></div>
          </div>

          {/* Demo Login */}

          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <p className="text-sm text-slate-400 text-center">
              Secure authentication using JWT tokens.
            </p>
          </div>

          {/* Register */}

          <p className="mt-8 text-center text-slate-400">
            New here?
            <Link
              to="/register"
              className="ml-2 font-semibold text-cyan-400 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
