import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateRecordBook } from "../dto/update-record-book.dto";
import { IStudent } from "../interfaces/student.interface";
import { StudentsService } from "../services/students.service";

@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {
  }
  @Get()
  async findAll(): Promise<IStudent[]> {
    return this.studentsService.findAll();
  }
  @Get("count")
  async count(): Promise<IStudent> {
    return this.studentsService.count();
  }
  @Get(":id")
  async findById(@Param("id") id: string): Promise<IStudent> {
    return this.studentsService.findById(id);
  }
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<void> {
    await this.studentsService.create(createStudentDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateStudentDto: CreateStudentDto): Promise<void> {
    await this.studentsService.updateById(id, updateStudentDto);
  }

  @Put(":id/record")
  async updateRecordBook(@Param("id") id: string, @Body() updateRecordBookDto: UpdateRecordBook): Promise<void> {
    await this.studentsService.updateRecordBookById(id, updateRecordBookDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    await this.studentsService.deleteOne(id);
  }
  /*@Delete()
  async deleteAll(): Promise<void> {
    await this.studentsService.deleteAll();
  }*/
}
// {
//   "id": 1,
//   "firstName": "Mike",
//   "lastName": "Gorbachev",
//   "middleName": "Aleksandrovich",
//   "birth": "07.10.1998",
//   "score": 3
// }
