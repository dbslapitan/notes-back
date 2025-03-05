import { Request, Response } from "express";
import { Note } from "../schemas/Note";
import { User } from "../schemas/User";

export const getNotes = async (req: Request, res: Response) => {
  
  const preview = await User.findOne({username: "preview"});
  const notes = await Note.find({isArchived: false, userId: preview?._id}).populate("userId");

  res.json(notes);
};