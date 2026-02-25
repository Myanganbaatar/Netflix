import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import Button from '../components/common/Button';

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRentals = JSON.parse(localStorage.getItem('rentals')) || [];
    setRentals(storedRentals);
  }, []);

  return (
    <div className="bg-netflix-black min-h-screen text-white p-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Mes locations</h1>
      
      {rentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-20">
          <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <p className="text-gray-400 text-xl">Aucune location pour le moment</p>
          <Button onClick={() => navigate('/')} variant="primary">Découvrir des films</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rentals.map((movie) => (
            <div key={movie.id} className="relative group flex flex-col">
               <div className="relative aspect-[2/3] overflow-hidden rounded-md mb-2">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
               </div>
               <h3 className="font-bold text-lg">{movie.title}</h3>
               <p className="text-gray-400 text-sm">Expire le: {movie.expireDate || '15/02/2026'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRentals;
