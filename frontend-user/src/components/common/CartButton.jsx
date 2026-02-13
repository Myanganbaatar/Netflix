import { useState } from 'react';

function CartButton({ cartItems = [], onRemove }) {
  const [showCart, setShowCart] = useState(false);
  const cartCount = cartItems.length;

  const toggleShow = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative flex items-center">
      <button 
        onClick={toggleShow}
        className="relative hover:text-gray-300 transition p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 border-2 border-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown du panier */}
      {showCart && (
        <div className="absolute top-10 right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
          <h4 className="text-white font-bold mb-3 border-b border-gray-700 pb-2">Mon Panier</h4>
          
          {cartItems.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {cartItems.map(movie => (
                <li 
                  key={movie.id} 
                  onDoubleClick={() => onRemove(movie.id)}
                  className="flex justify-between items-center text-sm p-2 hover:bg-gray-800 rounded cursor-pointer select-none group"
                  title="Double-cliquez pour supprimer"
                >
                  <span className="text-gray-300 truncate w-3/4">{movie.title}</span>
                  <span className="text-primary font-bold">{movie.price} €</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">Votre panier est vide.</p>
          )}

           {cartItems.length > 0 && (
            <div className="mt-4 pt-2 border-t border-gray-700 flex justify-between items-center">
               <span className="text-gray-400">Total:</span>
               <span className="text-white font-bold text-lg">
                 {cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)} €
               </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;