import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../interfaces/user.interface";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    findOneByEmail(email: string): Model<User>;
    deleteOne(id: string): Promise<void>;
}
