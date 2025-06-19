import { Helmet } from "react-helmet";

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
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">About Me</h2>
        <p className="text-gray-700 mb-2">
          Hi, I'm <span className="font-semibold text-blue-600">Kingshuk</span>, a passionate fullstack developer with a strong focus on building responsive, accessible, and visually engaging web applications.
        </p>
        <p className="text-gray-700 mb-2">
          I specialize in modern JavaScript frameworks like <span className="font-semibold">React</span> and have experience with tools such as <span className="font-semibold">Tailwind CSS</span>, <span className="font-semibold">JavaScript</span>, and <span className="font-semibold">Vite</span>.
        </p>
        <p className="text-gray-700 mb-2">
          My goal is to create seamless user experiences and deliver high-quality code. I enjoy collaborating with teams, learning new technologies, and solving real-world problems through code.
        </p>
        <p className="text-gray-700">
          When I'm not coding, you can find me exploring new design trends, contributing to open source, or writing about web development on my blog.
        </p>
      </section>
      {/* Add more sections or call-to-action buttons here if desired */}
    </main>
  )
}