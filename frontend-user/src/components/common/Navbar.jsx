import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../movies/SearchBar';
import CartButton from './CartButton';

function Navbar({ movies, onSearch, cartItems, onRemoveFromCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  
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
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
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
                <NavLink to="/" className={navLinkClass}>
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
            <CartButton cartItems={cartItems} onRemove={onRemoveFromCart} />
            {/* User Avatar */}
            <Link to="/login" className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
              <span className="text-sm font-bold text-white">U</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;