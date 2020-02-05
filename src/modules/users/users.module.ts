import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./controllers/users.controller";
import { UserSchema } from "./schemas/user.schema";
import { UsersService } from "./service/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    PassportModule.register({defaultStrategy: "jwt", session: false}),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
