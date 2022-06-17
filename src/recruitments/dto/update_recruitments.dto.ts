import { IsString, IsNumber } from 'class-validator';

export class UpdateRecruitmentDTO {
    @IsString()
    readonly recruit_position: string; 

    @IsNumber()
    readonly recruit_compensation: number; 

    @IsString()
    readonly recruit_content: string; 

    @IsString()
    readonly stack: string; 
}; 