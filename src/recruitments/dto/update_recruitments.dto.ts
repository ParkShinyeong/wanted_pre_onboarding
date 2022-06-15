import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruitmentDTO } from './create-recruiments.dto';

export class UpdateMovieDTO extends PartialType(CreateRecruitmentDTO){}; 