import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { StudentsController } from "./controllers/students/students.controller";
import { StudentsService } from "./services/students/students.service";

@Module({
  imports: [],
  controllers: [AppController, StudentsController],
  providers: [StudentsService],
})
export class AppModule {}
