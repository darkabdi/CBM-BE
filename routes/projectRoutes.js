import express from "express";
import { createProject, getProjects, getProjectById } from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Client-only route: create project
router.post("/", protect, createProject);

// Public or protected routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

export default router;
