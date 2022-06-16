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

    // 새로운 회사 생성 
    async createCompany(companyData: CreateCompanyDTO) {
        const newCompany = this.companyRepository.create(companyData); 
        await this.companyRepository.insert(newCompany); 
    };

    async findOneByCompanyId(companyId: number) {
        const company = await this.companyRepository.find({
            select: ['id', 'name', 'nation', 'city', 'created_at', 'updated_at'], 
            where: {id: companyId}, 
        }); 

        if(!company.length) {
            throw new NotFoundException(`Company with ID ${companyId} not found`); 
        }

        return company; 
    };
}; 
