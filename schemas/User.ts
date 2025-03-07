import { model, Schema } from "mongoose"

export interface IUser{
  username: string
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

export const User = model("User", UserSchema);