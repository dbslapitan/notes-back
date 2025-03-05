import { Router } from "express";
import { getNotes } from "../controlers/preview";

export const previewRoute = Router();

previewRoute.get("/", getNotes);