import { FaShoppingCart } from "react-icons/fa";

export default function Header({ onOpenCart, cartCount }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-40">
      <h1 className="text-xl font-bold text-gray-800">🛒 Loja In-Dev</h1>
      <button
        onClick={onOpenCart}
        className="relative text-gray-700 hover:text-blue-600 transition"
      >
        <FaShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
