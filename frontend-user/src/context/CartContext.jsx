import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Chargez et initialisez le panier et les locations depuis le localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
      return [];
    }
  });

  const [rentals, setRentals] = useState(() => {
    try {
      const savedRentals = localStorage.getItem('rentals');
      return savedRentals ? JSON.parse(savedRentals) : [];
    } catch (error) {
      console.error('Failed to parse rentals from localStorage', error);
      return [];
    }
  });

  // Sauvegardez le panier et les locations à chaque modif
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rentals', JSON.stringify(rentals));
  }, [rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    setCart((currentCart) => {
      // Éviter les doublons
      if (currentCart.some(item => item.id === movie.id)) {
        return currentCart;
      }
      return [...currentCart, movie];
    });
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart((currentCart) => currentCart.filter(item => item.id !== movieId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0);
  };

  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };

  // Louer un film
  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours
    
    const rental = {
      id: Date.now() + Math.random(), // Unique ID
      movieId: movie.id, 
      title: movie.title,
      poster: movie.posterStr || movie.poster, // Handle different property names if necessary
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString()
    };
    
    // Mettre à jour la liste des films loués 
    setRentals(prev => [...prev, rental]);
    
    // Supprimer le film du panier s'il y est
    removeFromCart(movie.id);
    
    return { success: true, rental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    if (cart.length === 0) return { success: false, count: 0 };

    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours

    const newRentals = cart.map(movie => ({
      id: Date.now() + Math.random() + movie.id, // Ensure unique ID
      movieId: movie.id,
      title: movie.title,
      poster: movie.posterStr || movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString()
    }));

    setRentals(prev => [...prev, ...newRentals]);
    
    // Vider le panier
    clearCart();
    
    return { success: true, count: newRentals.length };
  };

  // Vérifier si un film est loué
  const isRented = (movieId) => {
    return rentals.some(rental => rental.movieId === movieId);
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find(rental => rental.movieId === movieId) || null;
  };

  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some(item => item.id === movieId);
  };

  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  
  return context;
}
