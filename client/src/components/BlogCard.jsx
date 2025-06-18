import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article
      tabIndex={0}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 md:p-6 mb-4 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label={`Read more about ${post.title}`}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
        {post.title}
      </h2>
      <p className="text-gray-600 text-xs md:text-sm mb-2">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4 line-clamp-3">
        {post.content}
      </p>
      <Link
        to={`/blog/${post._id}`}
        className="mt-auto text-blue-600 hover:text-blue-800 font-medium transition-colors focus:underline"
        aria-label={`Read more about ${post.title}`}
      >
        Read More &rarr;
      </Link>
    </article>
  );
}