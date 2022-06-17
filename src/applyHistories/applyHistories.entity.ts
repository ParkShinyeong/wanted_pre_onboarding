import { Recruitment } from 'src/recruitments/recruitments.entity';
import { User } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class ApplyHistory {
    @PrimaryGeneratedColumn()
    public id: number; 

    @Column({nullable: false})
    public recruitment_id: number; 

    @Column({nullable: false})
    public user_id: number; 
    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;
    
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;
    
    @ManyToOne(() => Recruitment, recruitment => recruitment.applyHistory, { 
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "recruitment_id", referencedColumnName: "id"}) 
    public recruitment!: Recruitment; 

    @ManyToOne(() => User, user => user.applyHistory, { 
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "user_id", referencedColumnName: "id"}) 
    public user: User; 
}