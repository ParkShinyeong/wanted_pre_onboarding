import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { Company } from './companies.entity';
import { CompaniesService } from './companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])], 
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
