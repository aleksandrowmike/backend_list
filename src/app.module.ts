import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { StudentsModule } from "./modules/students/students.module";
import { UsersModule } from "./modules/users/users.module";

const uri: string = "mongodb+srv://new-mikhail_31:LJL9KSbUnIG6QHzd@cluster0-ziqns.azure.mongodb.net/test?retryWrites=true&w=majority";

@Module({
  imports: [
    MongooseModule.forRoot(uri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}),
    StudentsModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
