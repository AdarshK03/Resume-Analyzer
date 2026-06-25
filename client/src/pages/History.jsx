import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

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
    } catch (err) {
      console.log(err);
    }
  }

  const filteredHistory = history.filter((item) =>
    item.file_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
          <div>
            <p className="text-slate-400 text-lg">All your previous analyses</p>

            <h1 className="mt-2 text-5xl font-bold">
              Analysis{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                History
              </span>
            </h1>
          </div>

          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-96 rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Table */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          {/* Header */}

          <div className="hidden md:grid grid-cols-12 border-b border-slate-800 px-8 py-5 text-sm uppercase tracking-wider text-slate-400">
            <div className="col-span-6">Resume</div>

            <div className="col-span-2">Score</div>

            <div className="col-span-2">Uploaded</div>

            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Rows */}

          {filteredHistory.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              No Resume History Found
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-slate-800 px-8 py-6 hover:bg-slate-800/40 transition"
              >
                {/* Resume */}

                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                    📄
                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">{item.file_name}</h2>

                    <p className="text-sm text-slate-400">Resume Analysis</p>
                  </div>
                </div>

                {/* Score */}

                <div className="md:col-span-2 flex items-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.total_score}
                  </p>

                  <p className="ml-2 text-slate-400">/100</p>
                </div>

                {/* Date */}

                <div className="md:col-span-2 flex items-center text-slate-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>

                {/* Button */}

                <div className="md:col-span-2 flex items-center md:justify-center">
                  <Link
                    to={`/analysis/${item.id}`}
                    className="rounded-xl border border-slate-700 px-6 py-2 transition hover:bg-slate-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Total Analyses</p>

            <h2 className="mt-3 text-5xl font-bold">{history.length}</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Highest Score</p>

            <h2 className="mt-3 text-5xl font-bold text-cyan-400">
              {history.length > 0
                ? Math.max(...history.map((i) => i.total_score))
                : 0}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Average Score</p>

            <h2 className="mt-3 text-5xl font-bold text-purple-400">
              {history.length > 0
                ? Math.round(
                    history.reduce(
                      (sum, item) => sum + item.total_score,

                      0,
                    ) / history.length,
                  )
                : 0}
              %
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
