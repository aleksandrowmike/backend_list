import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../interfaces/user.interface";
import { UsersService } from "../service/users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<void>;
    getByEmail(email: string): Promise<User>;
    delete(id: string): Promise<void>;
    testAuthRoute(): Object;
}
