import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ appName = 'Fusion Hub' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Later we will clear auth token / user state
    navigate('/');
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
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
