import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
@UseGuards(AuthGuard())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any): string {
    return this.appService.getHello(req.user);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
