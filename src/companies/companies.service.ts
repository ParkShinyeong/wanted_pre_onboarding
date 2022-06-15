import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';

@Injectable()
export class CompaniesService {
    constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {
        this.companyRepository = companyRepository; 
    }

    // 새로운 회사 생성 

}
