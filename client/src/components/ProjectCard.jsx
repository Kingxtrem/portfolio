import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 md:p-6 mb-4 flex flex-col h-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
        {project.title}
      </h2>
      <p className="text-gray-500 text-xs md:text-sm mb-2 font-mono">
        {project.technologies.join(', ')}
      </p>
      <p className="text-gray-700 mb-4 line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-4 mt-auto text-blue-600 text-sm font-medium">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus:underline transition-colors"
            aria-label={`Live demo for ${project.title}`}
          >
            Live Demo &rarr;
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus:underline transition-colors"
            aria-label={`Source code for ${project.title}`}
          >
            Code &rarr;
          </a>
        )}
        <Link
        to={`/projects/${project._id}`}
        className="mt-auto text-blue-600 hover:text-blue-800 font-medium transition-colors focus:underline"
        aria-label={`Read more about ${project.title}`}
      >
        Read More &rarr;
      </Link>
      </div>
    </article>
  );
}