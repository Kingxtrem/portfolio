import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import ProjectManager from './pages/admin/ProjectManager';
import { useAuth } from './context/AuthContext';

// PrivateRoute moved outside App for best practice
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/blog" element={<PrivateRoute><BlogManager /></PrivateRoute>} />
        <Route path="/admin/projects" element={<PrivateRoute><ProjectManager /></PrivateRoute>} />
        {/* 404 Not Found route */}
        <Route path="*" element={<div className="p-8 text-center text-2xl text-gray-500">404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}