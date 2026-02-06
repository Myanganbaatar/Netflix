import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';

// Données de test temporaires
const DUMMY_MOVIES = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    title: `Movie Title ${i + 1}`,
    poster_path: null, 
    backdrop_path: null,
    overview: "This is a description of the movie. It is very interesting and you should watch it."
}));

const HERO_MOVIE = {
    id: 999,
    title: "Featured Movie",
    overview: "This is the featured movie for the hero section.",
    backdrop_path: null
};

export default function Home() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header />
      <main>
        <MovieHero movie={HERO_MOVIE} />
        <div className="container mx-auto px-4 py-8 -mt-20 relative z-20">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <MovieList movies={DUMMY_MOVIES} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
