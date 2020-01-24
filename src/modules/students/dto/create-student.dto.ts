import { IRecordBook } from "../interfaces/record-book.interfaces";

export class CreateStudentDto {
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
