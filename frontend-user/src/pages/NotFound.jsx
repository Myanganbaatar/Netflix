import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-4xl font-bold mb-6 text-white">Page introuvable</h2>
      <p className="text-xl text-gray-400 mb-10">Oups ! La page que vous recherchez n'existe pas.</p>
      
      <Button onClick={() => navigate('/')} variant="primary" size="lg" className="px-8 py-3 text-lg font-bold">
        Retour à l'accueil
      </Button>
    </div>
  );
}

export default NotFound;
