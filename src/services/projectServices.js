import Project from "../models/Project.js";

const projectService = {
  async createProject(user, data) {
    // 🔒 Only clients can create projects
    if (user.role !== "client") {
      throw new Error("Only clients can create projects");
    }

    const { title, category, budget, description } = data;

    if (!title || !category || !budget || !description) {
      throw new Error("All fields are required");
    }

    const project = await Project.create({
      title,
      category,
      budget,
      description,
      client: user.id,
    });

    return project;
  },

  async getClientProjects(user) {
    if (user.role !== "client") {
      throw new Error("Unauthorized");
    }

    return Project.find({ client: user.id }).sort({ createdAt: -1 });
  },

  async getOpenProjects() {
    // For freelancers later
    return Project.find({ status: "open" }).sort({ createdAt: -1 });
  },
};

export default projectService;
