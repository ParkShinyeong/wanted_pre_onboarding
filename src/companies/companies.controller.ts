import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDTO } from './dto/create-companies.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companyService: CompaniesService){}

    @Post() 
    createCompany(@Body() companyData: CreateCompanyDTO): Promise<object> {
        return this.companyService.createCompany(companyData); 
    }; 

    @Get("/:id")
    findOneCompany(@Param('id') companyId: number): Promise<object> {
        return this.companyService.findOneByCompanyId(companyId);  
    }; 
}
