import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Attendre le chargement de l'état d'authentification
  if (loading) {
      return <div className="flex h-screen items-center justify-center bg-black text-white">Chargement...</div>;
  }
  
  if (!isAuthenticated()) {
    // Rediriger vers la page de connexion
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;