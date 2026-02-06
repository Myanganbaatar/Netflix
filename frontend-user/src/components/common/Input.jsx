export default function Input({ type = "text", placeholder, value, onChange, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-primary text-white ${className}`}
    />
  );
}
