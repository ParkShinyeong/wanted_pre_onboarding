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
    async createUser(userData: CreateUserDTO) {
        const newUser = this.userRepository.create(userData)
        await this.userRepository.insert(newUser); 
    }; 

    async findOneByUserId(userId: number) {
        const user = await this.userRepository.find({
            select: ['id', 'name', 'email', 'created_at', 'updated_at'], 
            where: {id: userId}, 
        }); 

        if(!user.length) {
            return false; 
        }
        
        return true; 
    }; 

    async applyRecruitment(applyData: CreateApplyHistoryDTO) {
        const { user_id, recruitment_id } = applyData; 
        if(!this.findOneByUserId(user_id)) {
            throw new NotFoundException(`User with ID ${user_id} not found`); 
        }

        if(!this.recruitmentService.checkId(recruitment_id)) {
            throw new NotFoundException(`Recruitment with ID ${recruitment_id} not found`);
        }

        // ? 중복 지원 시 예외 처리를 해준다. 
        // const apply = await this.applyHistoryRepository.find({
        //     where: { user_id: user_id, recruitment_id: recruitment_id}
        // })
        // if(apply.length) {
        // // 중복 시 예외 처리
        //     throw new ConflictException("Already Exist apply")
        // }

        // // 지원 성공 
        // const newApply = this.applyHistoryRepository.create(applyData);
        // const newApplyData = await this.applyHistoryRepository.insert(newApply);

        // ? 중복이 발생하지는 않지만 예외 처리가 되지 않는다. 
        await this.applyHistoryRepository.upsert([{
            user_id: user_id,
            recruitment_id: recruitment_id
        }], ["user_id", "recruitment_id"]); 
        return;
    }
}; 
