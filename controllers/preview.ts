import { Request, Response } from "express";
import { Note } from "../schemas/Note";
import { User } from "../schemas/User";

const PREVIEW_ID = process.env.PREVIEW_ID;

export const getNotes = async (req: Request, res: Response) => {
  
  const preview = await User.findOne({username: "preview"});
  const notes = await Note.find({userId: preview?._id}).populate("userId").sort({lastEdited: "desc"});
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

export const saveNote = async (req: Request, res: Response) => {
  const note = {
    ...req.body,
    userId: PREVIEW_ID
  };
  try{
    const newNote = await Note.create(note);
    res.json(newNote._id);
  }
  catch(e){
    res.status(500).json(e);
  }
}