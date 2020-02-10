import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../../users/dto/login-user.dto";
import { User } from "../../users/interfaces/user.interface";
import { UsersService } from "../../users/service/users.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  // tslint:disable-next-line:no-any
  async validateUserByPassword(loginAttempt: LoginUserDto): Promise<any> {
    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
    return new Promise((resolve, reject) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) { throw new UnauthorizedException(); }
        if (isMatch) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          reject(new UnauthorizedException());
      }
      });

    });
  }
  // tslint:disable-next-line:typedef
  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
      // tslint:disable-next-line:unnecessary-else
    } else {
      throw new UnauthorizedException();
    }

  }
  createJwtPayload(user: User): Object {
    const data: JwtPayload = {
      email: user.email
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    };
  }
}
