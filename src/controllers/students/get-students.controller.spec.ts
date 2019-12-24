import { Test, TestingModule } from "@nestjs/testing";
import { GetStudentsController } from "./students.controller";

describe("GetStudents Controller", () => {
  let controller: GetStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetStudentsController],
    }).compile();

    controller = module.get<GetStudentsController>(GetStudentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
