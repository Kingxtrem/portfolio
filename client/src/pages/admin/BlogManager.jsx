import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import TipTapEditor from '../../components/TipTapEditor';

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Fetch posts
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  // Create post
  const createPost = async data => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/posts', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts([res.data, ...posts]);
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  // Update post
  const updatePost = async data => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${editingPost._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map(p => (p._id === editingPost._id ? res.data : p)));
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async id => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
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
      <h1 className="text-2xl font-bold mb-6">Manage Blog Posts</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <TipTapEditor
        onSubmit={editingPost ? updatePost : createPost}
        defaultPost={editingPost || {}}
        isEditing={!!editingPost}
      />

      {loading && (
        <div className="text-center text-gray-500 my-4">Loading...</div>
      )}

      <div className="mt-8 space-y-3">
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
                  onClick={() => setEditingPost(post)}
                  className="text-blue-600 hover:underline focus-visible:underline text-sm transition"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
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