import { Router } from "express";
import { getNotes, saveNote } from "../controllers/preview";

export const previewRoute = Router();

previewRoute.get("/", getNotes);
previewRoute.post("/", saveNote);