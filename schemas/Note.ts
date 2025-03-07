import { model, Schema, SchemaTypes } from "mongoose";
import { IUser, User } from "./User";

export interface INote{
  userId: string | IUser,
  tags: string[],
  content: string,
  title: string,
  isArchived: boolean
}

const NoteSchema = new Schema<INote>({
  userId: {
    type: SchemaTypes.ObjectId, 
    ref: User,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    updatedAt: "lastEdited",
    createdAt: "createdAt"
  }
}
);

export const Note = model("Note", NoteSchema);