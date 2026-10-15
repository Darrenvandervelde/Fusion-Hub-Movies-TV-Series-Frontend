import "./FilterBar.css";

const TYPES = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Series" },
];

function FilterBar({ typeFilter, genreFilter, genres, onTypeChange, onGenreChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Type</span>
        <div className="filter-chips">
          {TYPES.map((t) => (
            <button
              key={t.value}
              className={`chip ${typeFilter === t.value ? "active" : ""}`}
              onClick={() => onTypeChange(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Genre</span>
        <div className="filter-chips">
          <button
            className={`chip ${genreFilter === "all" ? "active" : ""}`}
            onClick={() => onGenreChange("all")}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g}
              className={`chip ${genreFilter === g ? "active" : ""}`}
              onClick={() => onGenreChange(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
