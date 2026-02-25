import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function LoginForm() {
  const navigate = useNavigate();
  /* Todo : Créez la variable détat pour stocker dans un objet le mail et le mot de passe et initialisez-la */
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* Todo : Créez et codez la fonction déclenchée à la modification du mail ou du mot de passe et celle 
  déclenchée à la soumission du formulaire (affichage dans la console de lobjet complet)*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulation de connexion
    setTimeout(() => {
      // Sauvegarde locale de l'utilisateur (temporaire)
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0] 
      }));
      
      setLoading(false);
      /* TODO : Allez à la page d’accueil */
      navigate('/');
    }, 1000);
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
          className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border border-red-500' : ''}`}
          placeholder="email@example.com"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Mot de passe</label>
        <input 
          name="password" 
          type="password" 
          value={formData.password}
          onChange={handleChange}
          className={`bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${errors.password ? 'border border-red-500' : ''}`}
          placeholder=""
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
      </div>

      <Button type="submit" variant="primary" className="mt-2" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>

      <p className="text-gray-400 text-sm text-center mt-4">
        Pas encore de compte ? <span onClick={() => navigate('/register')} className="text-red-600 cursor-pointer hover:underline">S'inscrire</span>
      </p>
    </form>
  );
}

export default LoginForm;
