import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentsModule } from 'src/recruitments/recruitments.module';
import { ApplyHistory } from './applyhistories.entity';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ApplyHistory]), RecruitmentsModule], 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
