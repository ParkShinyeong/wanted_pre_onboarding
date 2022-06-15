import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        this.userRepository = userRepository; 
    }

    // 유저 생성 
    async createUser(userData: CreateUserDTO) {
        const newUser = this.userRepository.create(userData)
        await this.userRepository.insert(newUser); 
    }
}
