import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";

@Controller()
@UseGuards(AuthGuard())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any): string {
    return this.appService.getHello(req.user);
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      dest: "./assets/uploadedFiles",
      limits: { fileSize: 2000000, files: 1 },
      fileFilter(req, file, cb) {
        if (file.mimetype == "application/pdf") cb(null, true);
        else cb(null, false);
      },
    })
  )
  uploadFile(@UploadedFile() file) {
    if (file === undefined)
      throw new HttpException(
        "Only PDF files can be uploaded. Check your file format",
        HttpStatus.UNSUPPORTED_MEDIA_TYPE
      );
    return `${file.originalname} successfully uploaded`;
  }
}
