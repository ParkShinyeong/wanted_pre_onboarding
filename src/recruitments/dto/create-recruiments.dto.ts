import { IsString } from 'class-validator';


export class CreateRecruitmentDTO {
    @IsString()
    readonly recruit_position: string; 

    @IsString()
    readonly recruit_compensation: string; 

    @IsString()
    readonly recruit_content: string; 

    @IsString()
    readonly stack: string; 

}