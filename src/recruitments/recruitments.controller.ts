import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { RecruitmentsService } from './recruitments.service';

@Controller('recruitments')
export class RecruitmentsController {
    constructor(private readonly recruimentService: RecruitmentsService) {}

    @Post() 
    createRecruitment(@Body() recruitmentData: CreateRecruitmentDTO) {
        return this.recruimentService.createRecruitment(recruitmentData); 
    }
}
