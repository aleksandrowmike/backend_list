import { Document } from "mongoose";
import { IRecordBook } from "./record-book.interfaces";

export interface IStudent extends Document {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  grade: number;
  country: string;
  city: string;
  about: string;
  birth: Date;
  recordBook?: [IRecordBook];
}
