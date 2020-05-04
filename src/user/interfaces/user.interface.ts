import * as mongoose from 'mongoose';
export interface UserInterface extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}
