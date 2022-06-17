import { Company } from 'src/companies/companies.entity';
import { ApplyHistory } from 'src/users/applyhistories.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity("Recruitment") 
export class Recruitment {
    @PrimaryGeneratedColumn()
    public id: number; 

    @Column()
    public recruit_position: string;

    @Column()
    public recruit_compensation: number;

    @Column()
    public recruit_content: string;

    @Column()
    public stack: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;

    @Column({nullable: false})
    public company_id: number; 

    @OneToMany(() => ApplyHistory, applyHistory => applyHistory.recruitment) 
    public applyHistory: ApplyHistory[]; 

    @ManyToOne(() => Company, company => company.recruitment, {
        nullable: false, 
        eager: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({name: "company_id", referencedColumnName: "id"}) 
    public company: Company;
}