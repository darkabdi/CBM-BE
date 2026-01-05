import Projects from "../models/Projects.js";

// Create a new project (client only)
export const createProject = async (req, res) => {
  try {
    const { title, category, budget, description, files } = req.body;

    if (!title || !category || !budget || !description) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const project = await Projects.create({
      title,
      category,
      budget,
      description,
      files,
      client: req.user.id, // link project to logged-in client
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects (for marketplace)
export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find().populate("client", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id).populate("client", "name email");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
