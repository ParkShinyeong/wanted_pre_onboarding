import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruitmentsService } from 'src/recruitments/recruitments.service';
import { Repository } from 'typeorm';
import { ApplyHistory } from './applyhistories.entity';
import { CreateApplyHistoryDTO } from './dto/create-apply-histories.dto';
import { CreateUserDTO } from './dto/create-users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        @InjectRepository(ApplyHistory) 
        private applyHistoryRepository: Repository<ApplyHistory>,
        private recruitmentService: RecruitmentsService,
        ) {
        this.userRepository = userRepository; 
    }

    // 유저 생성 
    async createUser(userData: CreateUserDTO): Promise<object> {
        const newUser = this.userRepository.create(userData);
        await this.userRepository.insert(newUser); 
        return { message: "Create success!" };
    }; 

    // 유저 id 체크  
    async checkId(userId: number): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: {id: userId}, 
        }); 

        if(!user) return false;
        return true; 
    }; 

    // 유저 정보 확인   
    async findOneByUserId(userId: number): Promise<object> {
        const user = await this.userRepository.findOne({
            where: {id: userId}, 
        }); 

        if(!user) {
            throw new NotFoundException(`User with ID ${userId} not found`); 
        }
        return user; 
    }; 

    // 채용 공고 지원 
    async applyRecruitment(applyData: CreateApplyHistoryDTO): Promise<object> {
        const { user_id, recruitment_id } = applyData; 
        const checkUser = await this.checkId(user_id); 
        if(!checkUser) {

            throw new NotFoundException(`User with ID ${user_id} not found`); 
        };

        const checkRecruitment = await this.recruitmentService.checkId(recruitment_id)
        if(!checkRecruitment) {
            throw new NotFoundException(`Recruitment with ID ${recruitment_id} not found`);
        };

        await this.applyHistoryRepository.upsert([{
            user_id: user_id,
            recruitment_id: recruitment_id
        }], ["user_id", "recruitment_id"]);

        return { message: "Create success!" };
    }
}; 
