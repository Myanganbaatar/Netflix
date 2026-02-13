import { useState } from 'react';
import Button from '../common/Button';

function LoginForm() {
  /* Todo : Créez la variable d’état pour stocker dans un objet le mail et le mot de passe et initialisez-la */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  /* Todo : Créez et codez la fonction déclenchée à la modification du mail ou du mot de passe et celle 
  déclenchée à la soumission du formulaire (affichage dans la console de l’objet complet)*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-black/50 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-4">Connexion</h2>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Email</label>
        <input 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="email@example.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Mot de passe</label>
        <input 
          name="password" 
          type="password" 
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" variant="primary" className="mt-2">
        Valider
      </Button>
    </form>
  );
}

export default LoginForm;
