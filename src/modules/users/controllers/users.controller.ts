import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../interfaces/user.interface";
import { UsersService } from "../service/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }
  @Get(":email")
  @UseGuards(AuthGuard())
  async getByEmail(@Param("email") email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
  @Delete(":id")
  @UseGuards(AuthGuard())
  async delete(@Param("id") id: string): Promise<void> {
    await this.usersService.deleteOne(id);
  }
  @Get("test")
  @UseGuards(AuthGuard())
  testAuthRoute(): Object {
    return {
      message: "You did it!"
    };
  }
}
