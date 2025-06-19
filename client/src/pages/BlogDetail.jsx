import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from '../components/Axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await Axios.get(`/api/posts/${id}`)
      setPost(res.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id]);

  if (loading)
    return (
      <div className="p-4 text-lg" aria-busy="true">
        Loading post...
      </div>
    );
  if (!post)
    return (
      <div className="p-4 text-lg text-red-500">
        Post not found.
      </div>
    );

  return (
    <article className="p-4 max-w-2xl mx-auto">
     
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title || 'Blog featured'}
          className="w-full rounded mb-4 object-cover max-h-96"
        />
      )}
      <div
        className="text-gray-800 leading-relaxed whitespace-pre-wrap prose prose-blue"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}