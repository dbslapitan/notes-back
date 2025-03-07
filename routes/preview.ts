import { Router } from "express";
import { getNotes } from "../controllers/preview";

export const previewRoute = Router();

previewRoute.get("/", getNotes);