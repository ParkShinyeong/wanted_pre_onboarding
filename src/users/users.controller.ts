import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post() 
    createUser(@Body() userData: CreateUserDTO) {
        return this.userService.createUser(userData); 
    }
}
