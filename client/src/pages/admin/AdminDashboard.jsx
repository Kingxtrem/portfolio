import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
      <nav aria-label="Admin navigation" className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6">
        <Link
          to="/admin/blog"
          className="text-blue-600 hover:underline focus-visible:underline transition"
        >
          Manage Blog Posts
        </Link>
        <Link
          to="/admin/projects"
          className="text-blue-600 hover:underline focus-visible:underline transition"
        >
          Manage Projects
        </Link>
      </nav>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}