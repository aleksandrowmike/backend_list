import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../service/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }
  @Get("test")
  @UseGuards(AuthGuard())
  testAuthRoute(): Object {
    return {
      message: "You did it!"
    };
  }
}
