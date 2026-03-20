import Navbar from '../common/Navbar';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}>
      <div className="flex justify-between items-center p-4">
        <Navbar />
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 rounded border"
        >
          {theme === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
        </button>
      </div>
    </header>
  );
}
