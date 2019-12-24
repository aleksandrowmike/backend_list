import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `To get student data, go to <b>/students</b>`;
  }
}
