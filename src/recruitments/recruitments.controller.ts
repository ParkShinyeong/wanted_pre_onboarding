import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { UpdateRecruitmentDTO } from './dto/update_recruitments.dto';
import { RecruitmentsService } from './recruitments.service';

@Controller('recruitments')
export class RecruitmentsController {
    constructor(private readonly recruitmentService: RecruitmentsService) {}

    @Get("/:page") 
    findAllRecruitment(@Param("page") page: number): Promise<object>  {
        return this.recruitmentService.findAll(page); 
    }

    @Post() 
    createRecruitment(@Body() recruitmentData: CreateRecruitmentDTO): Promise<object> {
        return this.recruitmentService.createRecruitment(recruitmentData); 
    }

    @Patch("/:id")
    updateRecruitment(@Param("id") recruitmentId: number, @Body() updateData: UpdateRecruitmentDTO): Promise<object> {
        return this.recruitmentService.updateRecruitment(recruitmentId, updateData); 
    }

    @Get("/details/:id")
    findOneRecruitment(@Param("id") recruitmentId: number): Promise<object> {
        return this.recruitmentService.findOneByRecruitmentId(recruitmentId); 
    }

    @Delete("/:id")
    deleteRecruitment(@Param("id") recruitmentId: number): Promise<object> {
        return this.recruitmentService.deleteRecruitment(recruitmentId)
    }
}
