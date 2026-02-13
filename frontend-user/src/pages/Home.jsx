import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MovieHero from '../components/movies/MovieHero';
import MovieCarousel from '../components/movies/MovieCarousel';
import moviesData from '../data/movies.json';

const Home = () => {
    const movies = moviesData;
    const heroMovie = movies[0];
    const popularMovies = [...movies]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    const genreMovies = movies.filter(movie => movie.genre === 'Science-Fiction').slice(0, 5);
    const recentMovies = movies.filter(movie => movie.year > 2010);

    return (
        <div className="bg-netflix-black min-h-screen text-white">
            <Header />
            
            <main>
                <MovieHero movie={heroMovie} />
                
                <div className="space-y-8 pb-8 mt-4">
                    <MovieCarousel title="Films Populaires" movies={popularMovies} />
                    <MovieCarousel title="Science-Fiction" movies={genreMovies} />
                    <MovieCarousel title="Films Récents" movies={recentMovies} />
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default Home;
