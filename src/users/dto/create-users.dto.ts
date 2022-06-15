import { IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString() 
    readonly name: string; 


    @IsString() 
    readonly email: string; 

}