import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UserDTO } from '@realestatemanager/shared';

@Injectable()
export class UsersService {
    private readonly dataPath = path.resolve(__dirname, '../../../src/data/users.json');

    async getUserByEmailAndPassword(email: string, password: string): Promise<UserDTO | undefined> {
        const users = await this.readUsers();
        return users.find(user => user.email === email && user.password === password); // In real-world applications, use hash comparison
    }

    getAllUserEmails(users: UserDTO[]): string[] {
        return users.map(user => user.email);
    }

    async getAllUsers(): Promise<UserDTO[]> {
        return this.readUsers();
    }

    private async readUsers(): Promise<UserDTO[]> {
        const data = await fs.promises.readFile(this.dataPath, 'utf8');
        return JSON.parse(data);
    }
}


