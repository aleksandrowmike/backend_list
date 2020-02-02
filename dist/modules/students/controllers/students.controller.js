"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const create_student_dto_1 = require("../dto/create-student.dto");
const update_record_book_dto_1 = require("../dto/update-record-book.dto");
const students_service_1 = require("../services/students.service");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async findAll() {
        this.studentsService.findAll()
            .then(result => console.log("Student successfully received"))
            .catch(err => console.log(err));
        return this.studentsService.findAll();
    }
    async count() {
        return this.studentsService.count();
    }
    async findById(id) {
        return this.studentsService.findById(id);
    }
    async create(createStudentDto) {
        await this.studentsService.create(createStudentDto);
    }
    uploadFile(file, res) {
        res.send({ filename: file.filename });
        console.log(file.path);
    }
    async serveAvatar(fileId, res) {
        res.sendFile(fileId, { root: "avatars" });
    }
    async update(id, updateStudentDto) {
        await this.studentsService.updateById(id, updateStudentDto)
            .then((result) => console.log("Student id " + id + " successfully updated"))
            .catch(err => console.log(err));
    }
    async updateRecordBook(id, updateRecordBookDto) {
        await this.studentsService.updateRecordBookById(id, updateRecordBookDto);
    }
    async delete(id) {
        await this.studentsService.deleteOne(id);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    common_1.Get("count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "count", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findById", null);
__decorate([
    common_1.Post(""),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    common_1.Post("upload"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("image", {
        storage: multer_1.diskStorage({
            destination: "./avatars",
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
                this.fieldId = randomName;
                return cb(null, `${randomName}${path_1.extname(file.originalname)}`);
            }
        })
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "uploadFile", null);
__decorate([
    common_1.Get("avatars/:fileId"),
    __param(0, common_1.Param("fileId")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "serveAvatar", null);
__decorate([
    common_1.Put(":id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    common_1.Put(":id/record"),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_record_book_dto_1.UpdateRecordBook]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateRecordBook", null);
__decorate([
    common_1.Delete(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "delete", null);
StudentsController = __decorate([
    common_1.Controller("students"),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map