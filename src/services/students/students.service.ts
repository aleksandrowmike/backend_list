import { Injectable } from "@nestjs/common";
import { Book, IBook } from "../../data/book";

@Injectable()
export class StudentsService {
  public students: object;
  public notification: string;
  public getStudents(): object {
    const books = Book.find((err, book: object[]) => {
        if (err) { this.students = { error: err }; }
        this.students = book;
    });
    return this.students;
  }
  public deleteStudent(id: string): string {
    const book = Book.deleteOne({ _id: id }, (err) => {
      this.notification = err ? "Error" : `Successfully Deleted ${id}`;
    });
    return this.notification;
  }
}
