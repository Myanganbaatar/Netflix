import { useState } from 'react';

function SearchBar() {
  /* Todo : Créez les variables d’état nécessaires et initialisez-les */
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  /* Todo : Créez et codez les fonctions déclenchées à la modification de la zone de texte et à la soumission du 
  formulaire (affichage dans la console du mot recherché)*/
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recherche pour:", searchTerm);
  };

  return (
    <div className="relative">
      {/* Bouton de recherche */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="hover:text-gray-300 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      {/* Input de recherche (apparaît au clic) */}
      {isOpen && (
        <form 
          onSubmit={handleSubmit}
          className="absolute right-0 top-10 z-50 p-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
        >
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleChange}
            placeholder="Rechercher un film..."
            className="w-64 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-primary text-white mb-2"
            autoFocus
          />
          <div className="text-xs text-gray-400 px-1">
             <p>Vous cherchez: <span className="text-white font-medium">{searchTerm}</span></p>
          </div>
          <button type="submit" className="hidden">Rechercher</button>
        </form>
      )}
    </div>
  );
}
export default SearchBar;
