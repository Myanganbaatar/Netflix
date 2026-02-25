import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

// Couleurs par genre
const genreColors = {
  'Action': 'bg-red-500',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-500',
  'Science-Fiction': 'bg-purple-500',
  'Horreur': 'bg-orange-500',
  'Thriller': 'bg-gray-500'
};

function MovieDescription({ description }) {
  /* Todo : Créez les variables d’état nécessaires et initialisez-les */
  const [isExpanded, setIsExpanded] = useState(false);

  /* Todo : Créez la fonction qui permet de changer l’état en cliquant sur le bouton */
  const toggleDescription = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <p className={`text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {description} 
      </p>
      <button 
        onClick={toggleDescription}
        className="text-xs text-primary hover:text-primary-dark mt-1 font-semibold"
      >
        {isExpanded ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
  );
}

function MovieCard({ movie, onRent, ...props }) {
  const navigate = useNavigate();
  const { title, poster, rating, genre, year, duration, description, id } = movie;
  const badgeColor = genreColors[genre] || 'bg-gray-700';

  /* Todo : Créez les variables d’état nécessaires et initialisez-les */
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 50); // Simulation de likes initiaux

  /* Todo : Créez la fonction qui permet au clic sur le bouton de liker une seule fois, sinon on enlève le like */
  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRent = (e) => {
    e.stopPropagation();
    if (onRent) {
      onRent(movie);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div 
      className="group/card relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleCardClick}
      {...props}
    >
      {/* Image principale */}
      <div className="relative aspect-[2/3]">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Badge de note */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">
            ⭐ {rating}
          </span>
        </div>

        <div className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-bold text-white shadow-md ${badgeColor}`}>
          {genre}
        </div>
      </div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>

        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{rating}/10</span>
          <span className="text-gray-400">{year}</span>
          <span className="text-gray-400">{duration}min</span>
        </div>

        <MovieDescription description={description} />

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button size="sm" className="flex-1" onClick={handleRent}>
              ▶ Louer {movie.price}€
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              + Info
            </Button>
          </div>
           {/* Like Button */}
           <button 
            onClick={handleLike}
            className={`px-4 py-2 rounded text-sm font-bold transition-colors ${ isLiked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
          >
            {isLiked ? '❤' : '🤍'} {likes} likes
          </button>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
