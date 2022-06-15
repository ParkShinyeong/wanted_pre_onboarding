import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {Recruitment} from "../recruitments/recruitments.entity"
import { ApplyHistory } from './applyhistories.entity';

@Entity("User") 
export class User {
    @PrimaryGeneratedColumn()
    public id: number; 

    @Column()
    public name: string;
    
    @Column()
    public email: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;

    //  @ManyToMany(type => Recruitment, recruitment => recruitment.id, {
    //      cascade: true
    //  })
    //  @JoinTable()
    //  recruitments: Recruitment[]; 
    
    @OneToMany(() => ApplyHistory, applyHistory => applyHistory.user) 
    public applyHistories!: ApplyHistory[]; 
}