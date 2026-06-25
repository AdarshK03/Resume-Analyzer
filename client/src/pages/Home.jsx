import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      title: "ATS Score",
      description:
        "Get a detailed score based on education, skills, projects, experience, and resume structure.",
      icon: "📊",
    },
    {
      title: "AI Analysis",
      description:
        "Powered by Google Gemini AI to identify strengths, weaknesses, and improvement areas.",
      icon: "🤖",
    },
    {
      title: "Resume History",
      description:
        "Store and revisit previous analyses to track improvements over time.",
      icon: "📂",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          AI Powered Resume Analysis
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          Improve Your Resume
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Before Recruiters See It
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-400">
          Upload your resume and receive instant AI-powered feedback,
          category-wise scores, strengths, weaknesses, and actionable
          improvement suggestions to increase your chances of landing
          interviews.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/upload"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700"
          >
            Analyze Resume
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-700 px-8 py-3 font-semibold transition hover:bg-slate-800"
          >
            Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Use Resume Insight?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">Ready to improve your resume?</h2>

          <p className="mt-4 text-slate-400">
            Upload your resume and receive professional AI-generated feedback in
            seconds.
          </p>

          <Link
            to="/upload"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
