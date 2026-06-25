import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/resume/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const totalResumes = history.length;

  const avgScore =
    totalResumes > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.total_score, 0) /
            totalResumes,
        )
      : 0;

  const bestScore =
    totalResumes > 0 ? Math.max(...history.map((item) => item.total_score)) : 0;

  const latestResume = totalResumes > 0 ? history[0].file_name : "No Resume";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-lg">Welcome back</p>

            <h1 className="mt-2 text-5xl font-bold">
              Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
          </div>

          <Link
            to="/upload"
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            + New Analysis
          </Link>
        </div>

        {/* Stats */}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="RESUMES ANALYZED" value={totalResumes} />

          <StatCard title="AVERAGE SCORE" value={`${avgScore}%`} />

          <StatCard title="BEST SCORE" value={`${bestScore}%`} />

          <StatCard title="LATEST RESUME" value={latestResume} small />
        </div>

        {/* Lower Section */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Recent */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Analyses</h2>

              <Link to="/history" className="text-slate-400 hover:text-white">
                View All →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {history.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 p-5 hover:border-cyan-500 transition"
                >
                  <div>
                    <p className="font-semibold">{item.file_name}</p>

                    <p className="text-sm text-slate-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-cyan-400">
                        {item.total_score}
                      </p>

                      <p className="text-xs text-slate-400">score</p>
                    </div>

                    <Link
                      to={`/analysis/${item.id}`}
                      className="rounded-lg border border-slate-700 px-5 py-2 hover:bg-slate-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">Quick Tips</h2>

            <ul className="mt-6 space-y-5 text-slate-300">
              <li>🟢 Start bullet points with strong action verbs.</li>

              <li>🟢 Quantify achievements using numbers.</li>

              <li>🟢 Match resume keywords with the job description.</li>

              <li>🟢 Keep formatting ATS-friendly.</li>

              <li>🟢 Keep projects above 3 with measurable impact.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, small }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>

      <p
        className={`mt-4 font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent ${
          small ? "text-xl" : "text-5xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default Dashboard;
