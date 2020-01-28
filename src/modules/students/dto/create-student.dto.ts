import { IRecordBook } from "../interfaces/record-book.interfaces";

export class CreateStudentDto {
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
  recordBook: [IRecordBook];
}
