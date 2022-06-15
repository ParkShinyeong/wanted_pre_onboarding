import { Company } from 'src/companies/companies.entity';
import { ApplyHistory } from 'src/users/applyhistories.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';


@Entity("Recruitment") 
export class Recruitment {
    @PrimaryColumn()
    public id: number; 

    @Column()
    public recruit_position: string;

    @Column()
    public recruit_compensation: string;

    @Column()
    public recruit_content: string;

    @Column()
    public stack: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date;

    // @ManyToMany(() => User, user => user.id)
    // @JoinTable()
    // users: User[]; 

    @OneToMany(() => ApplyHistory, applyHistory => applyHistory.recruitment) 
    public applyHistories!: ApplyHistory[]; 

    @ManyToOne(() => Company, company => company.recruiment, {
        nullable: false, 
        onDelete: "CASCADE"
    })
    public company: Company;
}