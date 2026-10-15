import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import mediaData from '../data/media.json';
import settings from '../data/settings.json';
import './Home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In future this can become an API call
    // For now we load from local JSON (easy to develop)
    setData(mediaData);
  }, []);

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Fusion Hub...</p>
      </div>
    );
  }

  // Pick first trending item for the big hero banner
  const heroItem = data.trending[0];

  return (
    <div className="home">
      <Navbar appName={settings.appName} />

      <Hero item={heroItem} />

      <div className="rows">
        <MovieRow title="Trending Now" items={data.trending} />
        <MovieRow title="Popular Movies" items={data.popularMovies} />
        <MovieRow title="Popular TV Series" items={data.popularTV} />
        <MovieRow title="Top Rated" items={data.topRated} />
      </div>
    </div>
  );
}

export default Home;
