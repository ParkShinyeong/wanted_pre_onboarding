import { Recruitment } from 'src/recruitments/recruitments.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';


@Entity()
export class ApplyHistory {
    @PrimaryGeneratedColumn()
    public id: number; 

    @ManyToOne(() => Recruitment, recruitment => recruitment.id, {
        nullable: false, 
        onDelete: "CASCADE"
    })
    public recruitment!: Recruitment; 

    @ManyToOne(() => User, user => user.id, {
        nullable: false, 
        onDelete: "CASCADE"
    })
    public user!: User; 

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;
    
}