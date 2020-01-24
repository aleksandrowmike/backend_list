import { Model } from "mongoose";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateRecordBook } from "../dto/update-record-book.dto";
import { IStudent } from "../interfaces/student.interface";
export declare class StudentsService {
    private readonly studentModel;
    constructor(studentModel: Model<IStudent>);
    create(createStudentDto: CreateStudentDto): Promise<IStudent>;
    findAll(): Promise<IStudent[]>;
    findById(id: string): Promise<IStudent>;
    count(): Promise<IStudent>;
    deleteOne(id: string): Promise<string>;
    deleteAll(): Promise<void>;
    updateById(id: string, updateStudentDto: CreateStudentDto): Promise<void>;
    updateRecordBookById(id: string, updateRecordBookDto: UpdateRecordBook): Promise<void>;
}
