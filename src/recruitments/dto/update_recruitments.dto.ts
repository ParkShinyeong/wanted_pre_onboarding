import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRecruitmentDTO {
    @IsString()
    @IsOptional()
    readonly recruit_position: string; 

    @IsNumber()
    @IsOptional()
    readonly recruit_compensation: number; 

    @IsString()
    @IsOptional()
    readonly recruit_content: string; 

    @IsString()
    @IsOptional()
    readonly stack: string; 
}; 