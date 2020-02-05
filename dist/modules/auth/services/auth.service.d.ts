import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../../users/dto/login-user.dto";
import { User } from "../../users/interfaces/user.interface";
import { UsersService } from "../../users/service/users.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<any>;
    validateUserByJwt(payload: JwtPayload): Promise<Object>;
    createJwtPayload(user: User): Object;
}
