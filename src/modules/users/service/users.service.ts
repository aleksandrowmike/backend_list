import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../interfaces/user.interface";
@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneByEmail(email: string): Model<User> {
    return this.userModel.findOne({email: email});
  }
  async deleteOne(id: string): Promise<void> {
    return this.userModel.deleteOne({_id: id});
  }
}
