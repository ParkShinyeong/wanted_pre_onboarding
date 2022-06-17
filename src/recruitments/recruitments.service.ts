import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Repository } from 'typeorm';
import { CreateRecruitmentDTO } from './dto/create-recruiments.dto';
import { UpdateRecruitmentDTO } from './dto/update_recruitments.dto';
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
            this.companiesService.findOneByCompanyId(recruitmentData["company_id"]); 
        } catch(e) {
            console.log(e); 
            return e; 
        }
        const newRecruitment = this.recruitmentRepository.create(recruitmentData)
        await this.recruitmentRepository.insert(newRecruitment); 
    }

    // 채용 공고를 수정합니다. 
    async updateRecruitment(id: number, updateData: UpdateRecruitmentDTO) {
        
        const checkId = await this.findOneByRecruitmentId(id)
        if(!checkId.length) {
            throw new NotFoundException(`Recruitment with ID ${id} not found`);
        }

        await this.recruitmentRepository
        .createQueryBuilder()
        .update(Recruitment)
        .set(updateData)
        .where('id = :id',  { id })
        .execute(); 
    }

    async findOneByRecruitmentId(id: number) {
        const recruitment = await this.recruitmentRepository.find({
            select: ['id'], 
            where: {id}
        }); 

        if(!recruitment.length) {
            throw new NotFoundException(`Recruitment with ID ${id} not found`);
        }
        
        return recruitment; 
    }

    // 채용 공고 목록을 가져옵니다. 
    async findAll() {
        const recruitmentList = await this.recruitmentRepository
        // .find({
        //     select: ['id', 'recruit_position', 'recruit_compensation', 'stack', 'company'], 
        // }); 
        .createQueryBuilder('r')
        .select(['r.id', 'r.recruit_position', 'r.recruit_compensation', 'r.stack', 'c.name', 'c.nation', 'c.city'])
        .leftJoin('r.company', 'c')
        // .where('r.id = :id', {id: 1})
        .getMany(); 

        console.log(recruitmentList); 
        return recruitmentList; 

    }
}
