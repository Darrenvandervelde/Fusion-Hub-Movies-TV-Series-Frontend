import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import FilterBar from "../components/FilterBar";
import mediaData from "../data/media.json";
import settings from "../data/settings.json";
import "./Home.css";

function Home() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all"); // all | movie | tv
  const [genreFilter, setGenreFilter] = useState("all");

  useEffect(() => {
    setData(mediaData);
  }, []);

  // Flatten all items once for search / filter
  const allItems = useMemo(() => {
    if (!data) return [];
    const map = new Map();
    [...data.trending, ...data.popularMovies, ...data.popularTV, ...data.topRated].forEach(
      (item) => {
        if (!map.has(item.id)) map.set(item.id, item);
      }
    );
    return Array.from(map.values());
  }, [data]);

  // Collect unique genres for the filter chips
  const genres = useMemo(() => {
    const set = new Set();
    allItems.forEach((item) => item.genre?.forEach((g) => set.add(g)));
    return Array.from(set).sort();
  }, [allItems]);

  // Apply search + type + genre filters
  const filteredItems = useMemo(() => {
    let result = allItems;

    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }

    if (genreFilter !== "all") {
      result = result.filter((item) => item.genre?.includes(genreFilter));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.overview?.toLowerCase().includes(q) ||
          item.genre?.some((g) => g.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allItems, typeFilter, genreFilter, searchQuery]);

  // Helper: filter a specific row while still respecting global filters
  const filterRow = (items) => {
    if (!items) return [];
    let result = items;

    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }
    if (genreFilter !== "all") {
      result = result.filter((item) => item.genre?.includes(genreFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.overview?.toLowerCase().includes(q) ||
          item.genre?.some((g) => g.toLowerCase().includes(q))
      );
    }
    return result;
  };

  const isFiltering =
    searchQuery.trim() !== "" || typeFilter !== "all" || genreFilter !== "all";

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Fusion Hub...</p>
      </div>
    );
  }

  const heroItem = data.trending[0];

  return (
    <div className="home">
      <Navbar
        appName={settings.appName}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hide hero when actively filtering so results are higher */}
      {!isFiltering && <Hero item={heroItem} />}

      <div className={`rows ${isFiltering ? "rows-filtered" : ""}`}>
        <FilterBar
          typeFilter={typeFilter}
          genreFilter={genreFilter}
          genres={genres}
          onTypeChange={setTypeFilter}
          onGenreChange={setGenreFilter}
        />

        {isFiltering ? (
          // Single "Search Results" row when filtering
          filteredItems.length > 0 ? (
            <MovieRow
              title={`Results (${filteredItems.length})`}
              items={filteredItems}
            />
          ) : (
            <div className="empty-state">
              <h2>No titles found</h2>
              <p>
                Try a different search term or clear the filters.
              </p>
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setGenreFilter("all");
                }}
              >
                Clear all filters
              </button>
            </div>
          )
        ) : (
          // Normal Netflix-style rows
          <>
            <MovieRow title="Trending Now" items={filterRow(data.trending)} />
            <MovieRow title="Popular Movies" items={filterRow(data.popularMovies)} />
            <MovieRow title="Popular TV Series" items={filterRow(data.popularTV)} />
            <MovieRow title="Top Rated" items={filterRow(data.topRated)} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
