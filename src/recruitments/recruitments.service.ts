import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Repository } from 'typeorm';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { Recruitment } from './recruitments.entity';


@Injectable()
export class RecruitmentsService {

    constructor(
        @InjectRepository(Recruitment) 
        private recruitmentRepository: Repository<Recruitment>,
        private companiesService: CompaniesService,         
        ) {
        this.recruitmentRepository = recruitmentRepository; 
    }

    //채용 공고 생성 
    async createRecruitment(recruitmentData: CreateRecruitmentDTO) {
        try{
            this.companiesService.findOneByCompanyId(recruitmentData["companyId"]); 
        } catch(e) {
            console.log(e); 
            return e; 
        }

        const newRecruitment = this.recruitmentRepository.create(recruitmentData)
        await this.recruitmentRepository.insert(newRecruitment); 
    }
}
