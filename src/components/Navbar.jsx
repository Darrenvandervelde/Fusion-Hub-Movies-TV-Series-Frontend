import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ appName = "Fusion Hub", searchQuery = "", onSearchChange }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
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
        {/* Search */}
        <div className={`search-box ${isSearchOpen || searchQuery ? "open" : ""}`}>
          <button
            className="search-btn"
            title="Search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            🔍
          </button>
          <input
            type="text"
            placeholder="Titles, genres..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => {
              if (!searchQuery) setIsSearchOpen(false);
            }}
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => onSearchChange?.("")}
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>

        {user && <span className="user-greeting">Hi, {user.username}</span>}

        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
