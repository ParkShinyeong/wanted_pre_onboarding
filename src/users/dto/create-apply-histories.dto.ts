import { IsNumber } from 'class-validator';

export class CreateApplyHistoryDTO {
    @IsNumber() 
    readonly user_id: number; 


    @IsNumber() 
    readonly recruitment_id: number; 

}