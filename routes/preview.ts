import { Router } from "express";
import { getArchives, getNotes } from "../controllers/preview";

export const previewRoute = Router();

previewRoute.get("/", getNotes);

previewRoute.get("/archived", getArchives);