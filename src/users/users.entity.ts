import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
    
    @OneToMany(() => ApplyHistory, applyHistory => applyHistory.user) 
    public applyHistory!: ApplyHistory[]; 
};