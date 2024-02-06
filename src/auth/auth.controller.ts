import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from 'src/authguard/authguard.guard';

@Controller('auth')
export class LoginController {
    @Post("login")
    async login(@Body() data: LoginDTO) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (user == null) {
            throw new BadRequestException('User not found');
        }

        const valid = bcrypt.compare(data.password, user.password);

        if (!valid) {
            throw new BadRequestException('User wrong password');
        }


        return {
            jwt: jwt.sign(user, 'shhhhh')
        };
    }

    @Post("register")
    async register(@Body() data: RegisterDTO) {
        const prisma = new PrismaClient();
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: await bcrypt.hash(data.password, 10)
            }
        })

        return user;
    }

    @Get("user")
    @UseGuards(AuthGuard)
    async getUser(@Request() request) {
        return request.user;
    }
}
