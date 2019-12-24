import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentsService } from "../../services/students/students.service";

@Controller("students")
export class StudentsController {
  constructor(private Students: StudentsService) {
  }
  @Get()
  getStudentsList(): object {
    return this.Students.getStudents();
  }
  @Post()
  createStudents(): void {}

  @Put()
  updateStudents(): void {}

  @Delete(":id")
  deleteStudents(@Param("id") id: string): string {
    return this.Students.deleteStudent(id);
  }
}
