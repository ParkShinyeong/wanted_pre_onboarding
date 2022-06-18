import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    async checkId(id: number): Promise<boolean> {
        const recruitment = await this.recruitmentRepository.findOne({
            where: {id: id}
        }); 

        if(!recruitment) {
           return false; 
        }; 

        return true; 
    }

    //채용 공고 생성 
    async createRecruitment(recruitmentData: CreateRecruitmentDTO): Promise<object> {
        const { company_id } = recruitmentData; 
        const company = await this.companiesService.findOneByCompanyId(company_id);
        if(!company) {
            throw new NotFoundException(`Company with ID ${company_id} not found`); 
        }

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

    // 채용 공고 목록 요청 
    async findAll(current: number): Promise<object> {
        const pageSize = 5; 
        const recruitmentList = await this.recruitmentRepository 
        .createQueryBuilder('r')
        .select(['r.updated_at', 'r.id', 'r.recruit_position', 'r.recruit_compensation', 'r.stack'])
        .addSelect([ 'c.company_name', 'c.nation', 'c.city'])
        .orderBy('r.updated_at', 'DESC')
        .leftJoin('r.company', 'c')
        .skip(current * pageSize )
        .take(pageSize)
        .getMany(); 

        if(recruitmentList.length === 0) {
            throw new HttpException({
                status: HttpStatus.NO_CONTENT, 
                error: 'No result found!'
            }, 204)
        }
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
        .addSelect([ 'c.company_name', 'c.nation', 'c.city'])
        .addSelect(['re.id','re.recruit_position', 're.recruit_compensation', 're.stack'])
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
        const checkId = await this.checkId(id); 
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
