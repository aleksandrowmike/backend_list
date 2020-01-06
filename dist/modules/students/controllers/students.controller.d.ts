import { CreateStudentDto } from "../dto/create-student.dto";
import { IStudent } from "../interfaces/student.interface";
import { StudentsService } from "../services/students.service";
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(): Promise<IStudent[]>;
    count(): Promise<IStudent>;
    findById(id: string): Promise<IStudent>;
    create(createStudentDto: CreateStudentDto): Promise<void>;
    update(id: string, updateStudentDto: CreateStudentDto): Promise<void>;
    delete(id: string): Promise<void>;
}
