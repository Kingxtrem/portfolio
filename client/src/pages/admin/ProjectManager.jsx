import { useEffect, useState } from 'react';
import Axios from '../../components/Axios';
import { useAuth } from '../../context/AuthContext';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    demoUrl: '',
    repoUrl: '',
  });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    Axios
      .get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((tech) => tech.trim()),
    };
    try {
      if (editingProject) {
        const res = await Axios.put(
          `/api/projects/${editingProject._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(projects.map(p => (p._id === editingProject._id ? res.data : p)));
        setEditingProject(null);
      } else {
        const res = await Axios.post('/api/projects', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects([res.data, ...projects]);
      }
      setForm({
        title: '',
        description: '',
        technologies: '',
        demoUrl: '',
        repoUrl: '',
      });
    } catch (err) {
      setError('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      demoUrl: project.demoUrl,
      repoUrl: project.repoUrl,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    setError('');
    try {
      await Axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
      if (editingProject && editingProject._id === id) setEditingProject(null);
    } catch (err) {
      setError('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
       <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="Project_Manager" content="My personal portfolio and blog built with React and Vite." />
      <meta name="theme-color" content="#2563eb" />
      <title>Project_Manager</title>
      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-white p-4 rounded shadow"
        autoComplete="off"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleInput}
            placeholder="Title"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            required
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="technologies" className="text-sm font-medium mb-1">
            Technologies (comma separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            value={form.technologies}
            onChange={handleInput}
            placeholder="e.g. React, Node.js"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="demoUrl" className="text-sm font-medium mb-1">
            Demo URL
          </label>
          <input
            id="demoUrl"
            name="demoUrl"
            value={form.demoUrl}
            onChange={handleInput}
            placeholder="Demo URL"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="repoUrl" className="text-sm font-medium mb-1">
            Repo URL
          </label>
          <input
            id="repoUrl"
            name="repoUrl"
            value={form.repoUrl}
            onChange={handleInput}
            placeholder="Repo URL"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleInput}
            placeholder="Description"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-2 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {editingProject ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      {loading && (
        <div className="text-center text-gray-500 my-4">Loading...</div>
      )}

      <div className="space-y-3">
        {projects
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((project) => (
            <div
              key={project._id}
              className="border p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-xs text-gray-500">
                  {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-600 hover:underline focus-visible:underline text-sm transition"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:underline focus-visible:underline text-sm transition"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}