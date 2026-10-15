import './MovieCard.css';

function MovieCard({ item }) {
  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster';
          }}
        />
        <div className="card-overlay">
          <h3>{item.title}</h3>
          <div className="card-meta">
            <span className="rating">★ {item.rating}</span>
            <span>{item.year}</span>
          </div>
          <p className="card-type">{item.type === 'movie' ? 'Movie' : 'Series'}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
