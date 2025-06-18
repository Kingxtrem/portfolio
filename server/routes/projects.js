const express = require('express');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProjects);                  // PUBLIC → List all projects
router.get('/:id', getProjectById);            // PUBLIC → Single project
router.post('/', authMiddleware, createProject);  // Protected → Admin only
router.put('/:id', authMiddleware, updateProject); // Protected → Admin only
router.delete('/:id', authMiddleware, deleteProject); // Protected → Admin only

module.exports = router;
