import { IsString } from 'class-validator';

export class CreateCompanyDTO {
    @IsString() 
    readonly name: string; 

    @IsString() 
    readonly nation: string; 

    @IsString() 
    readonly city: string; 
}; 