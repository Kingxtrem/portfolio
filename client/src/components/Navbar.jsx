import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav
        className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link to="/" className="text-2xl font-bold text-blue-400">
          MyPortfolio
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:text-blue-300 focus-visible:underline">Home</Link>
          <Link to="/projects" className="hover:text-blue-300 focus-visible:underline">Projects</Link>
          <Link to="/blog" className="hover:text-blue-300 focus-visible:underline">Blog</Link>
          <Link to="/admin" className="hover:text-blue-300 focus-visible:underline">Admin</Link>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-900 px-4 pb-3 space-y-2">
          <Link to="/" className="block hover:text-blue-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/projects" className="block hover:text-blue-300" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/blog" className="block hover:text-blue-300" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/admin" className="block hover:text-blue-300" onClick={() => setMenuOpen(false)}>Admin</Link>
        </div>
      )}
    </header>
  );
}