import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  // @Post('/')
  getHello(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(req.query);
    return res.status(200).send({ status: 200, message: 'ok' })
  }
}
