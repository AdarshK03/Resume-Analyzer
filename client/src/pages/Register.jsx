import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/register", formData);

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
            Create your
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Account
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Start improving your resume in seconds.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Name */}

            <div>
              <label className="mb-2 block font-medium">Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none transition focus:border-cyan-400"
              />
            </div>

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
              <label className="mb-2 block font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 outline-none transition focus:border-cyan-400"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 py-4 text-lg font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 font-semibold text-cyan-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
