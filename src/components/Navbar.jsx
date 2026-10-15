import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ appName = "Fusion Hub" }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check both localStorage (Remember me) and sessionStorage
    const stored =
      localStorage.getItem("fusionhub_user") ||
      sessionStorage.getItem("fusionhub_user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fusionhub_user");
    localStorage.removeItem("fusionhub_logged_in");
    sessionStorage.removeItem("fusionhub_user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">
          {appName}
        </Link>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <a href="#">Movies</a>
          <a href="#">TV Series</a>
          <a href="#">My List</a>
        </div>
      </div>

      <div className="navbar-right">
        <button className="search-btn" title="Search (coming soon)">
          🔍
        </button>

        {user && (
          <span className="user-greeting">Hi, {user.username}</span>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
