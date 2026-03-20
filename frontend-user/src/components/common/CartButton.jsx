import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartButton() {
  const { cart, removeFromCart, getCartTotal } = useCart();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const cartCount = cart.length;

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
        <div className="absolute top-10 right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-[100]">
          <h3 className="text-lg font-bold mb-4 text-white">Votre Panier</h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-400">Votre panier est vide</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.posterStr || item.poster} alt={item.title} className="w-12 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.price} €</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex justify-between font-bold mb-4 text-white">
                  <span>Total</span>
                  <span>{getCartTotal().toFixed(2)} €</span>
                </div>
                <Link 
                   to="/cart"
                   onClick={() => setShowCart(false)}
                   className="w-full font-semibold rounded transition-all duration-300 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl px-6 py-3 text-base"
                >
                    Voir le panier
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;