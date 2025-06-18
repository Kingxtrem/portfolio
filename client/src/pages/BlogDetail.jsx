import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
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
      <Helmet>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.content.slice(0, 150)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.slice(0, 150)} />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta property="og:url" content={`https://yourdomain.com/blog/${post._id}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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