import dotenv from "dotenv";
import DATA from "./data.json";
import { connect, connection } from "mongoose";
import { User } from "../schemas/User";
import { INote, Note } from "../schemas/Note";

dotenv.config();

const DB_URI = process.env.DB_URI;

(async () => {

  try {
    await connect(DB_URI as string);
    console.log("Dropping users collection...");
    await connection.dropCollection("users");
    console.log("Users collection dropped...");
    console.log("Dropping notes collection...");
    await connection.dropCollection("notes");
    console.log("Notes collection dropped...");
    console.log("Adding preview user...")
    const user = await User.create({ username: "preview" });
    console.log("preview added to Users...");

    const notes = DATA.notes.map(async (note) => {
      console.log(`Adding ${note.title} to notes collection...`);
      const { title, tags, content, isArchived, lastEdited } = note;
      return await Note.findOneAndReplace(
        {}, {
        userId: user,
        title,
        tags,
        content,
        isArchived,
        lastEdited: new Date(lastEdited)
      }, {
        upsert: true,
        timestamps: false
      }
      );
    });

    await Promise.allSettled(notes);

    console.log("Notes have been populated...");

    await connection.close();
  }
  catch (e) {
    console.log(e);
  }
})();