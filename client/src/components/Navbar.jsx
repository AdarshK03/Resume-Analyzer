import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const links = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Upload",
      path: "/upload",
    },
    {
      title: "History",
      path: "/history",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-8 py-4 shadow-xl">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-2xl">
              📄
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Resume
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Insight
                </span>
              </h1>
            </div>
          </Link>

          {/* Middle */}

          <div className="hidden md:flex items-center gap-2">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`

rounded-xl
px-5
py-2
transition

${
  location.pathname === item.path
    ? "bg-slate-800 text-white"
    : "text-slate-400 hover:text-white hover:bg-slate-800"
}

`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            {token ? (
              <button
                onClick={logout}
                className="rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-800"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-slate-400 hover:text-white">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-2 font-semibold text-black"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
