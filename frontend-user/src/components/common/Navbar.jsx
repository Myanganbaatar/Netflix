import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from '../movies/SearchBar';
import CartButton from './CartButton';
import { useAuth } from '../../context/AuthContext';

function Navbar({ movies, onSearch }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    // Ajouter l'écouteur
    window.addEventListener('scroll', handleScroll);
    // Nettoyage
    return () => { window.removeEventListener('scroll', handleScroll);};
  }, []); // Une seule fois

  const navLinkClass = ({ isActive }) => 
    isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-primary text-3xl font-bold tracking-tight">
              NETFLIX
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink to="/" end className={navLinkClass}>
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={navLinkClass}>
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-rentals" className={navLinkClass}>
                  Mes locations
                </NavLink>
              </li>
            </ul>
          </div>
          {/* User Section */}
          <div className="flex items-center space-x-4">
            <SearchBar movies={movies} onSearch={onSearch} />            
            <CartButton />
            
            <button className="hover:text-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user?.avatar || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                    alt={user?.name}
                    className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"
                  />
                  <span className="hidden md:block text-sm text-white">{user?.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mon profil
                    </NavLink>
                    <NavLink
                      to="/my-rentals"
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mes locations
                    </NavLink>
                    <hr className="border-gray-800 my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-red-500"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded transition text-white">
                  Connexion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;