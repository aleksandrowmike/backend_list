import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentsController } from "./controllers/students.controller";
import { StudentSchema } from "./schemas/student.schema";
import { StudentsService } from "./services/students.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
