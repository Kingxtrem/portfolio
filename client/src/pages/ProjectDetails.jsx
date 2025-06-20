import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../components/Axios'

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get(`api/projects/${id}`)
      .then(res => {
        setProject(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!project) return <p className="p-4 text-red-500">Project not found.</p>

  return (
    <div className="p-4 max-w-3xl mx-auto">
       <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="Project_Details" content="My personal portfolio and blog built with React and Vite." />
      <meta name="theme-color" content="#2563eb" />
      <title>Project_Details</title>
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(project.createdAt).toLocaleDateString()}</p>
      <p className="mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-gray-200 rounded text-sm">{tech}</span>
        ))}
      </div>

      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mr-4">Live Demo</a>}
      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Repository</a>}
    </div>
  )
}
