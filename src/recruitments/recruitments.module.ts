import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/companies.entity';
import { CompaniesModule } from 'src/companies/companies.module';
import { RecruitmentsController } from './recruitments.controller';
import { Recruitment } from './recruitments.entity';
import { RecruitmentsService } from './recruitments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, Company]), CompaniesModule],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService], 
  exports: [RecruitmentsService, TypeOrmModule]
})
export class RecruitmentsModule {}
