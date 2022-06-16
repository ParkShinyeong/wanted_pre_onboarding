import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { UpdateRecruitmentDTO } from './dto/update_recruitments.dto';
import { RecruitmentsService } from './recruitments.service';

@Controller('recruitments')
export class RecruitmentsController {
    constructor(private readonly recruimentService: RecruitmentsService) {}

    @Post() 
    createRecruitment(@Body() recruitmentData: CreateRecruitmentDTO) {
        return this.recruimentService.createRecruitment(recruitmentData); 
    }

    @Patch("/:id")
    updateRecruitment(@Param("id") recruitmentId: number, @Body() updateData: UpdateRecruitmentDTO) {
        return this.recruimentService.updateRecruitment(recruitmentId, updateData)
    }

}
