import { useEffect, useState } from 'react';
import Axios from '../components/Axios';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Axios
      .get('/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts.');
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-4 text-lg" aria-busy="true">
        Loading...
      </div>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="Blogs" content="My personal portfolio and blog built with React and Vite." />
      <meta name="theme-color" content="#2563eb" />
      <title>Blogs</title>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
        </div>
      )}
    </div>
  );
}