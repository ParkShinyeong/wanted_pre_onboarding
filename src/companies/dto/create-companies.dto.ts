import { IsString } from 'class-validator';

export class CreateCompanyDTO {
    @IsString() 
    readonly company_name: string; 

    @IsString() 
    readonly nation: string; 

    @IsString() 
    readonly city: string; 
}; 