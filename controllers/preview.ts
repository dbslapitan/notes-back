import { Request, Response } from "express";
import { Note } from "../schemas/Note";
import { User } from "../schemas/User";

export const getNotes = async (req: Request, res: Response) => {
  
  const preview = await User.findOne({username: "preview"});
  const notes = await Note.find({isArchived: false, userId: preview?._id}).populate("userId");
  const tags = notes.reduce((accumulator, current) => {
    const temp = [...accumulator];
    current.tags.forEach(tag => {
      if(!temp.includes(tag)){
        temp.push(tag);
      }
    });
    return temp;
  }, [] as string[]);
  res.json({
    notes,
    tags
  });
};

export const getArchives = async (req: Request, res: Response) => {
  
  const preview = await User.findOne({username: "preview"});
  const notes = await Note.find({isArchived: true, userId: preview?._id}).populate("userId");
  const tags = notes.reduce((accumulator, current) => {
    const temp = [...accumulator];
    current.tags.forEach(tag => {
      if(!temp.includes(tag)){
        temp.push(tag);
      }
    });
    return temp;
  }, [] as string[]);
  res.json({
    notes,
    tags
  });
};