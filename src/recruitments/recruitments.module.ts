import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentsController } from './recruitments.controller';
import { Recruitment } from './recruitments.entity';
import { RecruitmentsService } from './recruitments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService]
})
export class RecruitmentsModule {}
