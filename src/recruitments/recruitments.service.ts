import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { Recruitment } from './recruitments.entity';

@Injectable()
export class RecruitmentsService {

    constructor(@InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>) {
        this.recruitmentRepository = recruitmentRepository; 
    }

    //채용 공고 생성 
    async createRecruitment(recruitmentData: CreateRecruitmentDTO) {
        const newRecruitment = this.recruitmentRepository.create({
            ...recruitmentData, 
            // companyId: "companyId"
        })
        await this.recruitmentRepository.insert(newRecruitment); 
    }
}
