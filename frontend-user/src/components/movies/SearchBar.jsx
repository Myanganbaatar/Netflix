import { useState, useEffect, useRef } from 'react';

function SearchBar({ movies = [], onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Fix: remove wrapperRef from dependency array

  useEffect(() => {
    if (!movies) return; // Guard clause
    if (searchTerm.length >= 2) {
      // Filtrer les films en fonction du titre et la description
      const filtered = movies.filter(movie =>  
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Afficher les suggestions
      setSuggestions(filtered.slice(0, 5));
      setIsOpen(filtered.length > 0); // Correctly set isOpen
    } else {
      // vider la liste des suggestions et masquer le panneau
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setIsOpen(false);
    // Action lors de la sélection
    if (onSearch) {
      onSearch(movie);
    }
  };

  const handleFocus = () => {
    if (searchTerm.length >= 2 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Rechercher un film..."
          className="w-full px-4 py-2 pl-10 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-400 backdrop-blur-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
        />
        <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {suggestions.map(movie => (
            <div 
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-none"
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-10 h-14 object-cover rounded mr-3" 
              />
              <div>
                <h4 className="font-bold text-white text-sm">{movie.title}</h4>
                <p className="text-xs text-gray-400">
                   {movie.year} • {movie.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;