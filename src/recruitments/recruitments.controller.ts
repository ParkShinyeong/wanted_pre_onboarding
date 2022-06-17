import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { UpdateRecruitmentDTO } from './dto/update_recruitments.dto';
import { RecruitmentsService } from './recruitments.service';

@Controller('recruitments')
export class RecruitmentsController {
    constructor(private readonly recruitmentService: RecruitmentsService) {}

    @Post() 
    createRecruitment(@Body() recruitmentData: CreateRecruitmentDTO) {
        return this.recruitmentService.createRecruitment(recruitmentData); 
    }

    @Patch("/:id")
    updateRecruitment(@Param("id") recruitmentId: number, @Body() updateData: UpdateRecruitmentDTO) {
        return this.recruitmentService.updateRecruitment(recruitmentId, updateData); 
    }

    @Get() 
    findAllRecruitment() {
        return this.recruitmentService.findAll(); 
    }

    @Get("/:id")
    findOneRecruitment(@Param("id") recruitmentId: number) {
        return this.recruitmentService.findOneByRecruitmentId(recruitmentId); 
    }

    @Delete("/:id")
    deleteRecruitment(@Param("id") recruitmentId: number) {
        return this.recruitmentService.deleteRecruitment(recruitmentId)
    }

}
