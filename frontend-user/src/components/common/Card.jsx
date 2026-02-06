export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  );
}
