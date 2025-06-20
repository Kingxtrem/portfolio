import { useEffect, useState } from 'react';
import Axios from '../../components/Axios';
import { useAuth } from '../../context/AuthContext';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', author: 'Admin', featuredImage: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Fetch posts
  useEffect(() => {
    setLoading(true);
    Axios
      .get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  // Handle form input
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingPost) {
        const res = await Axios.put(
          `/api/posts/${editingPost._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(posts.map(p => (p._id === editingPost._id ? res.data : p)));
        setEditingPost(null);
      } else {
        const res = await Axios.post(
          '/api/posts',
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts([res.data, ...posts]);
      }
      setForm({ title: '', content: '', author: 'Admin', featuredImage: "" });
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  // Edit post
  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content, author: post.author, featuredImage: post.featuredImage });
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    setError('');
    try {
      await Axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter(p => p._id !== id));
      if (editingPost && editingPost._id === id) setEditingPost(null);
    } catch (err) {
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="Blog_Manager" content="My personal portfolio and blog built with React and Vite." />
      <meta name="theme-color" content="#2563eb" />
      <title>Blog_Manager</title>
      <h1 className="text-2xl font-bold mb-6">Manage Blog Posts</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Add/Edit Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8 bg-white p-4 rounded shadow">
        <input
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleInput}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <input type="text"
          name="featuredImage"
          onChange={handleInput}
          value={form.featuredImage}
          placeholder="Image URL"
          className="w-full border p-2 rounded" />
        <textarea
          name="content"
          value={form.content}
          onChange={handleInput}
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {editingPost ? 'Update Post' : 'Add Post'}
        </button>
        {editingPost && (
          <button
            type="button"
            className="w-full mt-2 text-gray-500 underline"
            onClick={() => {
              setEditingPost(null);
              setForm({ title: '', content: '', author: 'Admin', featuredImage: "" });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {loading && (
        <div className="text-center text-gray-500 my-4">Loading...</div>
      )}

      <div className="space-y-3">
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(post => (
            <div
              key={post._id}
              className="border p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:underline focus-visible:underline text-sm transition"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
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