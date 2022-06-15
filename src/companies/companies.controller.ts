import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDTO } from './dto/create-companies.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companyService: CompaniesService) {}

    @Post() 
    createCompany(@Body() companyData: CreateCompanyDTO) {
        return this.companyService.createCompany(companyData); 
    }
}
