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
    async createRecruitment(recruitmentData: CreateRecruitmentDTO): Promise<object> {
        try{
            this.companiesService.findOneByCompanyId(recruitmentData["company_id"]); 
        } catch(e) { 
            throw e; 
        }; 
        const newRecruitment = this.recruitmentRepository.create(recruitmentData)
        await this.recruitmentRepository.insert(newRecruitment); 
        return { message: "Create success!" };
    }

    // 채용 공고 수정
    async updateRecruitment(id: number, updateData: UpdateRecruitmentDTO): Promise<object> {
        
        const checkId = await this.checkId(id)
        if(!checkId) {
            throw new NotFoundException(`Recruitment with ID ${id} not found`);
        }

        await this.recruitmentRepository
        .createQueryBuilder()
        .update(Recruitment)
        .set(updateData)
        .where('id = :id',  { id })
        .execute(); 

        return { message: "Update success!" };
    }

    async checkId(id: number): Promise<boolean> {
        const recruitment = await this.recruitmentRepository.find({
            select: ['id'], 
            where: {id}
        }); 

        if(!recruitment.length) return false; 
        return true ; 
    }

    // 채용 공고 목록 요청 
    async findAll(current: number): Promise<object> {
        const pageSize = 5; 
        const recruitmentList = await this.recruitmentRepository 
        .createQueryBuilder('r')
        .select(['r.updated_at', 'r.id', 'r.recruit_position', 'r.recruit_compensation', 'r.stack'])
        .addSelect([ 'c.name', 'c.nation', 'c.city'])
        .orderBy('r.updated_at', 'DESC')
        .leftJoin('r.company', 'c')
        .skip(current * pageSize )
        .take(pageSize)
        .getMany(); 

        return recruitmentList; 
    }

    // 채용 상세 페이지 요청 
    async findOneByRecruitmentId(recruitmentId: number): Promise<object> {
        const checkId = await this.checkId(recruitmentId)
        if(!checkId) {
            throw new NotFoundException(`Recruitment with ID ${recruitmentId} not found`);
        }

        const recruitment = await this.recruitmentRepository
        .createQueryBuilder('r')
        .select(['r.id', 'r.recruit_position', 'r.recruit_compensation', 'r.stack', 'r.recruit_content'])
        .addSelect([ 'c.name', 'c.nation', 'c.city'])
        .addSelect(['re.id','re.recruit_position', 're.recruit_compensation', 're.stack', 're.recruit_content'])
        .leftJoin('r.company', 'c')
        .where('r.id = :id', {id: recruitmentId})
        .leftJoin('c.recruitment', 're')
        .getOne();

        let otherRecruitment: Recruitment[] = recruitment.company.recruitment;
        recruitment.company.recruitment = otherRecruitment.filter((el: object) => { 
            return el["id"] !== recruitmentId; 
        })

        return recruitment; 
    }

    // 채용 공고 삭제
    async deleteRecruitment(id: number): Promise<object> {

        const checkId = await this.checkId(id)
        if(!checkId) {
            throw new NotFoundException(`Recruitment with ID ${id} not found`);
        }

        await this.recruitmentRepository
        .createQueryBuilder()
        .delete()
        .from(Recruitment)
        .where("id = :id", {id: id})
        .execute(); 
        
        return { message: "Delete success!" };
    }
}
