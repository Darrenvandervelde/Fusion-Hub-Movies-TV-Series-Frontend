import { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

function MovieRow({ title, items }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>

      <div className="row-container">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          ‹
        </button>

        <div className="row-posters" ref={rowRef}>
          {items.map((item) => (
            <MovieCard key={`${item.id}-${item.title}`} item={item} />
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
