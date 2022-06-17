import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';
import { CreateCompanyDTO } from './dto/create-companies.dto';

@Injectable()
export class CompaniesService {
    constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {
        this.companyRepository = companyRepository; 
    }
    // 회사 생성 
    async createCompany(companyData: CreateCompanyDTO): Promise<object> {
        const newCompany = this.companyRepository.create(companyData); 
        await this.companyRepository.insert(newCompany); 
        return { message: "Create success!" };
    };

    // 회사 찾기 
    async findOneByCompanyId(companyId: number): Promise<object> {
        const company = await this.companyRepository.findOne({
            where: {id: companyId}, 
        }); 

        if(!company) {
            throw new NotFoundException(`Company with ID ${companyId} not found`); 
        }; 

        return company; 
    };
}; 
