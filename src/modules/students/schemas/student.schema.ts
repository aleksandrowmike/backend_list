import * as mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  birth: { type: Date, required: true },
  score: {type: Number, required: true},
});
