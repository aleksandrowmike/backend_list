import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from "../services/auth.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<Object>;
}
export {};
