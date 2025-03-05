import dotenv from "dotenv";
import DATA from "../data.json";
import { connect, connection } from "mongoose";
import { User } from "../schemas/User";
import { Note } from "../schemas/Note";

dotenv.config();

const DB_URI = process.env.DB_URI;

(async () => {

  await connect(DB_URI as string);
  console.log("Dropping users collection...");
  await connection.dropCollection("users");
  console.log("Users collection dropped...");
  console.log("Adding preview user...")
  const user = await User.create({username: "preview"});
  console.log("preview added to Users...");

  const notes = DATA.notes.map(async (note) => {
    console.log(`Adding ${note.title} to notes collection...`);
    const {title, tags, content} = note;
    return await Note.create({
      userId: user,
      title,
      tags,
      content
    });
  });

  await Promise.allSettled(notes);

  console.log("Notes have been populated...");

  await connection.close();
})();