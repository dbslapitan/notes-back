import { Request, Response } from "express";
import { Note } from "../schemas/Note";
import { User } from "../schemas/User";

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

export const createNote = async (req: Request, res: Response) => {
  try{
    const preview = await User.findOne({username: "preview"});
    const note = {
      ...req.body,
      userId: preview?._id
    };
    const newNote = await Note.create(note);
    res.json(newNote._id);
  }
  catch(e){
    res.status(500).json(e);
  }
}

export const saveNote = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const note = {
      ...req.body
    };
    await Note.findByIdAndUpdate(id, note);
    res.json("success");
  }
  catch(e){
    res.status(500).json(e);
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    
    await Note.findByIdAndDelete(id);
    res.json("success");
  }
  catch(e){
    res.status(500).json(e);
  }
}