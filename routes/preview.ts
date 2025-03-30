import { Router } from "express";
import { getNotes, createNote, saveNote, deleteNote } from "../controllers/preview";

export const previewRoute = Router();

previewRoute.get("/", getNotes);
previewRoute.post("/", createNote);
previewRoute.patch("/:id", saveNote);
previewRoute.delete("/:id", deleteNote);