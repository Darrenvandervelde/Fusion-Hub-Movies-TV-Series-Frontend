import './Hero.css';

function Hero({ item }) {
  if (!item) return null;

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to top, #141414 10%, transparent 50%),
                          linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%),
                          url(${item.backdrop})`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{item.title}</h1>
        <div className="hero-meta">
          <span className="rating">★ {item.rating}</span>
          <span>{item.year}</span>
          <span className="type-badge">{item.type === 'movie' ? 'Movie' : 'TV Series'}</span>
        </div>
        <p className="hero-overview">{item.overview}</p>
        <div className="hero-buttons">
          <button className="btn-play">▶ Play</button>
          <button className="btn-info">ℹ More Info</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
