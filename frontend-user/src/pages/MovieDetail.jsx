import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies as moviesData } from '../data/movies';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { addToCart, isInCart, rentMovie, isRented, getRentalByMovieId } = useCart();

  const handleRent = () => {
    if (!user) {
        navigate('/login');
        return;
    }
    const result = rentMovie(movie);
    if(result.success) {
        navigate('/my-rentals');
    }
  };

  const handleAddToCart = () => {
    addToCart(movie);
  };

  useEffect(() => {
    // Simulation d'un appel API
    const timer = setTimeout(() => {
      const foundMovie = moviesData.find((m) => m.id === parseInt(id));
      setMovie(foundMovie || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-xl">Chargement...</h2>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-4">Film introuvable</h2>
          <p className="text-gray-400 mb-8">Le film que vous recherchez n'existe pas.</p>
          <Button onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative w-full">
        {/* Background Image Container */}
        <div className="relative h-[60vh] md:h-[80vh] w-full">
            <div className="absolute inset-0">
            <img 
                src={movie.backdrop} 
                alt={movie.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>
            
            <div className="absolute top-24 left-4 z-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour
                </button>
            </div>
        </div>

        {/* Content Container - overlaps the image */}
        <div className="container mx-auto px-4 -mt-32 md:-mt-64 relative z-10 pb-12">
           <div className="flex flex-col md:flex-row gap-8 items-end">
               
               {/* Information principale (gauche) */}
               <div className="flex-1">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{movie.title}</h1>
                    
                    <div className="flex items-center gap-4 mb-6 text-sm">
                        <span className="bg-red-600 px-2 py-0.5 rounded text-white font-bold">Netflix</span>
                        <span className="text-gray-300">{movie.year}</span>
                        <span className="text-gray-300">{movie.duration} min</span>
                        <span className="border border-gray-500 px-2 py-0.5 rounded text-gray-300">{movie.genre}</span>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-2">Synopsis</h3>
                        <p className="text-gray-300 leading-relaxed max-w-2xl text-lg">{movie.description}</p>
                    </div>

                    <div className="flex gap-4 mb-8">
                        {isRented(movie.id) ? (
                            <div className="bg-green-600/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg flex items-center gap-3 w-full md:w-auto">
                                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="font-bold text-lg">Film loué</p>
                                    <p className="text-sm opacity-80">
                                        Disponible jusqu'au {new Date(getRentalByMovieId(movie.id)?.expiryDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Button size="lg" onClick={handleRent} className="bg-red-600 hover:bg-red-700 text-white px-8">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Louer pour {movie.price}€
                                </Button>
                                
                                {isInCart(movie.id) ? (
                                    <Button size="lg" className="bg-gray-700 text-white px-8 border border-white">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Dans le panier
                                    </Button>
                                ) : (
                                    <Button size="lg" onClick={handleAddToCart} className="bg-gray-800 hover:bg-gray-700 text-white px-8 border border-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Ajouter au panier
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                    
                     {/* Info Box */}
                    <div className="bg-gray-900/80 p-6 rounded-lg backdrop-blur-sm max-w-2xl border border-gray-800">
                        <h4 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2 text-white">Informations</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                                <span className="text-gray-400">Genre</span>
                                <span className="text-white font-medium">{movie.genre}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                                <span className="text-gray-400">Année</span>
                                <span className="text-white font-medium">{movie.year}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                                <span className="text-gray-400">Durée</span>
                                <span className="text-white font-medium">{movie.duration} minutes</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                                <span className="text-gray-400">Note</span>
                                <span className="text-yellow-400 font-bold">{movie.rating}/10</span>
                            </div>
                        </div>
                    </div>
               </div>
               
               {/* Poster (droite) */}
               <div className="hidden md:block w-72 shrink-0">
                   <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="rounded-lg shadow-2xl w-full border-4 border-gray-800/50 hover:scale-[1.02] transition-transform duration-300"
                   />
               </div>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;
