const Project = require('../models/Project');
const slugify = require('slugify');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, demoUrl, repoUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and Description are required' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const project = new Project({
      title,
      slug,
      description,
      technologies,
      demoUrl,
      repoUrl,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, technologies, demoUrl, repoUrl } = req.body;
    const updateFields = {};

    if (title) {
      updateFields.title = title;
      updateFields.slug = slugify(title, { lower: true, strict: true });
    }
    if (description) updateFields.description = description;
    if (technologies) updateFields.technologies = technologies;
    if (demoUrl) updateFields.demoUrl = demoUrl;
    if (repoUrl) updateFields.repoUrl = repoUrl;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};