import * as mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: {type: String},
  email: { type: String},
  phone: { type: String, required: true },
  sex: { type: String, required: true},
  grade: { type: Number, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  about: { type: String},
  birth: { type: Date, required: true },
  recordBook: {type: [Object] }
});
