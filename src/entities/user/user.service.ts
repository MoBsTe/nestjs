import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    public async createUser(userData: any) {
        // console.log("--------", userData);
        const salt = await genSalt(10);
        const hashPassword = await hash(userData.password, salt);

        console.log("dsfdsffs:", userData);
        const newUser = this.userRepository.create({
            ...userData,
            password: hashPassword,
        });
        return await this.userRepository.save(newUser);
    }

    public async getOneData(id: number) {
        return await this.userRepository.findOne({ where: { id } })
    }

    public async getAllUsers() {
        return await this.userRepository.find({
            select: [
                'id',
                'email',
                'nameFirst',
                'nameLast',
                'gender'
            ]
        })
    }

    public async updateUserData(id: number, body: any) {
        return await this.userRepository.update({ id }, body)
    }

    public async DeleteUser(id: number) {
        return `Delete User with id ${id}`;
    }
}
