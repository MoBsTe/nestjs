import { Controller, Delete, Get, Post, Put, Req, Res, Param, ParseIntPipe, Body, UseInterceptors } from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";
import { Response, Request } from "express";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    async getAllUsers(
        // @Req() req: Request,
        @Res() res: Response,
    ) {
        const users = await this.userService.getAllUsers()
        return res.send({ status: 'ok', data: users })
    };

    @Get('/:id')
    async getUser(
        // @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        const userData = await this.userService.getOneData(id)
        return res.send({ status: 'ok', userData })
    };

    @Post('/')
    //для form-data
    // @UseInterceptors(FileInterceptor(''))
    async createUser(
        // @Req() req: Request,
        @Body() body: any,
        @Res() res: Response,
    ) {

        await this.userService.createUser(body);
        return res.send({ status: "ok" })

    };

    @Put('/:id')
    // @UseInterceptors(FileInterceptor(''))
    async updateUser(
        // @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any,
        @Res() res: Response,
    ) {
        this.userService.updateUserData(id, body)
        return res.send({ status: 'ok' })
    };

    @Delete('/:id')
    async deleteUser(
        @Req() req: Request,
        @Res() res: Response,
    ) {

    };
}