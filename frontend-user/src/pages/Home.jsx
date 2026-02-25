import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
import MovieFilter from '../components/movies/MovieFilter';
import moviesData from '../../../data/movies.json';

const Home = () => {
    // 1-Chargez allMovies avec moviesData 
    const [allMovies] = useState(moviesData);
    const [filteredMovies, setFilteredMovies] = useState(moviesData);
    const [cart, setCart] = useState([]);

    const addToCart = (movie) => {
        if (!cart.find(item => item.id === movie.id)) {
            setCart([...cart, movie]);
        }
    };

    const removeFromCart = (movieId) => {
        setCart(cart.filter(item => item.id !== movieId));
    };

    const handleSearch = (movie) => {
        console.log("Film sélectionné :", movie);
    };

    return (
        <div className="bg-netflix-black min-h-screen text-white">
            <Navbar 
                movies={allMovies} 
                onSearch={handleSearch} 
                cartItems={cart}
                onRemoveFromCart={removeFromCart}
            />
            
            <main>
                {allMovies.length > 0 && <MovieHero movie={allMovies[0]} />}
                
                <div className="container mx-auto px-4 mt-8 pb-16">
                    <MovieFilter 
                        movies={allMovies} 
                        onFilter={setFilteredMovies}
                    />
                    
                    <MovieList 
                        title="Films disponibles" 
                        movies={filteredMovies} 
                        onRent={addToCart}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default Home;
