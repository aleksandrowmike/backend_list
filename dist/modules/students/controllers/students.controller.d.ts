import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateRecordBook } from "../dto/update-record-book.dto";
import { IStudent } from "../interfaces/student.interface";
import { StudentsService } from "../services/students.service";
export declare class StudentsController {
    private readonly studentsService;
    fieldId: string;
    constructor(studentsService: StudentsService);
    findAll(): Promise<IStudent[]>;
    count(): Promise<IStudent>;
    findById(id: string): Promise<IStudent>;
    create(createStudentDto: CreateStudentDto): Promise<void>;
    uploadFile(file: any, res: any): void;
    serveAvatar(fileId: any, res: any): Promise<any>;
    many(): Promise<void>;
    update(id: string, updateStudentDto: CreateStudentDto): Promise<void>;
    updateRecordBook(id: string, updateRecordBookDto: UpdateRecordBook): Promise<void>;
    delete(id: string): Promise<void>;
}
