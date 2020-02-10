import { LoginUserDto } from "../../users/dto/login-user.dto";
import { AuthService } from "../services/auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto, res: any): Promise<any>;
}
