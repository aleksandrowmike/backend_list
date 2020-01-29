import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateRecordBook } from "../dto/update-record-book.dto";
import { IStudent } from "../interfaces/student.interface";

@Injectable()
export class StudentsService {
  constructor(@InjectModel("Student") private readonly studentModel: Model<IStudent>) {}

  async create (createStudentDto: CreateStudentDto): Promise<IStudent> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }
  async many (body): Promise<void> {
    const createdStudent = new this.studentModel(body);
    return createdStudent.save();
  }
  async findAll(): Promise<IStudent[]> {
    return this.studentModel.find().exec();
  }
  async findById(id: string): Promise<IStudent> {
    return this.studentModel.find({_id: id}).exec();
  }
  async count(): Promise<IStudent> {
    return this.studentModel.count();
  }
  async deleteOne(id: string): Promise<string> {
    return this.studentModel.deleteOne({_id: id});
  }

  async deleteAll(): Promise<void> {
    return this.studentModel.remove({});
  }

  async updateById(id: string, updateStudentDto: CreateStudentDto): Promise<void> {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto);
  }

  async updateRecordBookById(id: string, updateRecordBookDto: UpdateRecordBook): Promise<void> {
    return this.studentModel.findOneAndUpdate({"_id": id}, { $set: { "recordBook": updateRecordBookDto}});
  }
}
