import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoginUserDto } from "../../users/dto/login-user.dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login (@Body() loginUserDto: LoginUserDto, @Res() res) {
    return this.authService.validateUserByPassword(loginUserDto)
      .then(result => res.status(200).json(result))
      .catch(x => {
        return res.status(x.status).json(x.message);
      });
  }
}
