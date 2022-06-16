import { IsNumber, IsString } from 'class-validator';


export class CreateRecruitmentDTO {
    @IsString()
    readonly recruit_position: string; 

    @IsNumber()
    readonly recruit_compensation: number; 

    @IsString()
    readonly recruit_content: string; 

    @IsString()
    readonly stack: string; 

    @IsNumber()
    readonly companyId: number; 
}