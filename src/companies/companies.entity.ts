import { Recruitment } from 'src/recruitments/recruitments.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity("Company") 
export class Company {
    @PrimaryGeneratedColumn()
    public id: number; 

    @Column()
    public name: string;
    
    @Column()
    public nation: string;

    @Column()
    public city: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;

    @OneToMany(() => Recruitment, (recruitment) => recruitment.company, {cascade: true})
    @JoinColumn()
    public recruitment: Recruitment[]; 

}