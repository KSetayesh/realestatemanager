import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '@realestatemanager/shared';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Existing getUser method...

    @Post('login')
    async getUserByEmailAndPassword(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<UserDTO> {
        const user = await this.usersService.getUserByEmailAndPassword(email, password);
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        return user;
    }

    @Get()
    async getAllUsers(): Promise<UserDTO[]> {
        return this.usersService.getAllUsers();
    }
}


