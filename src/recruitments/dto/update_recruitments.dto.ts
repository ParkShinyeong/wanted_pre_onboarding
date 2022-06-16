import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateRecruitmentDTO } from './create-recruiments.dto';

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