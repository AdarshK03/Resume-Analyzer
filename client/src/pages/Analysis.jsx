import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Analysis() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  async function fetchAnalysis() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalysis(res.data.analysis);
    } catch (err) {
      console.log(err);
    }
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center text-xl">
        Loading Analysis...
      </div>
    );
  }

  const scores = [
    {
      title: "Education",
      value: analysis.educationScore,
      max: 20,
    },
    {
      title: "Skills",
      value: analysis.skillsScore,
      max: 20,
    },
    {
      title: "Projects",
      value: analysis.projectsScore,
      max: 30,
    },
    {
      title: "Experience",
      value: analysis.experienceScore,
      max: 20,
    },
    {
      title: "Structure",
      value: analysis.structureScore,
      max: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Heading */}

        <h1 className="text-5xl font-bold">
          Resume
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Analysis
          </span>
        </h1>

        <p className="mt-3 text-slate-400">AI Generated Resume Report</p>

        {/* Overall Score */}

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="text-xl text-slate-400">Overall Score</h2>

          <p className="mt-4 text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {analysis.totalScore}
          </p>

          <p className="mt-4 text-slate-400">
            {analysis.totalScore >= 80
              ? "Excellent Resume"
              : analysis.totalScore >= 60
                ? "Good Resume"
                : "Needs Improvement"}
          </p>
        </div>

        {/* Category Scores */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold">Score Breakdown</h2>

          <div className="mt-8 space-y-8">
            {scores.map((item) => {
              const width = (item.value / item.max) * 100;

              return (
                <div key={item.title}>
                  <div className="flex justify-between">
                    <h3>{item.title}</h3>

                    <p>
                      {item.value} / {item.max}
                    </p>
                  </div>

                  <div className="mt-2 h-3 rounded-full bg-slate-700">
                    <div
                      style={{ width: `${width}%` }}
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths */}

        <Section title="Strengths" icon="✅" items={analysis.strengths} />

        {/* Weaknesses */}

        <Section title="Weaknesses" icon="⚠️" items={analysis.weaknesses} />

        {/* Improvements */}

        <Section
          title="AI Suggestions"
          icon="💡"
          items={analysis.improvements}
        />

        {/* Buttons */}

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            to="/upload"
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 font-semibold text-black"
          >
            Upload Another Resume
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl border border-slate-700 px-8 py-3 hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, items }) {
  return (
    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-semibold">
        {icon} {title}
      </h2>

      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-700 bg-slate-950 p-5"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analysis;
