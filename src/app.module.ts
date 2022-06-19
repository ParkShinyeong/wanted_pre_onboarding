import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { CompaniesModule } from './companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../config/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    UsersModule, 
    RecruitmentsModule, 
    CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
