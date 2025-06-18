import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <main className="p-4 max-w-2xl mx-auto">
      <Helmet>
        <title>My Portfolio | Home</title>
        <meta name="description" content="Welcome to my personal portfolio and blog website." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
        Welcome to My Portfolio
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore my projects, read my blog, and get in touch!
      </p>
      {/* Add more sections or call-to-action buttons here if desired */}
    </main>
  );
}