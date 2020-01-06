import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { StudentsModule } from "./modules/students/students.module";

const uri: string = "mongodb+srv://new-mikhail_31:LJL9KSbUnIG6QHzd@cluster0-ziqns.azure.mongodb.net/test?retryWrites=true&w=majority";

@Module({
  imports: [MongooseModule.forRoot(uri), StudentsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
