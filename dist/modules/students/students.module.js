"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const students_controller_1 = require("./controllers/students.controller");
const student_schema_1 = require("./schemas/student.schema");
const students_service_1 = require("./services/students.service");
let StudentsModule = class StudentsModule {
};
StudentsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "Student", schema: student_schema_1.StudentSchema }])],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
    })
], StudentsModule);
exports.StudentsModule = StudentsModule;
//# sourceMappingURL=students.module.js.map