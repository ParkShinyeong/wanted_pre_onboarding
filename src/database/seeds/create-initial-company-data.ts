import { Connection } from 'typeorm'; 
import { Factory, Seeder } from 'typeorm-seeding'; 

export class CreateInitialUserData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
        .createQueryBuilder()
        .insert()
        .into("Company")
        .values([
            { nation: "Korea", city: "Seoul", company_name: "company1", }, 
            { nation: "Korea", city: "Busan", company_name: "company2", }, 
            { nation: "America", city: "NewYork", company_name: "company3", }, 
            { nation: "Germany", city: "Berlin", company_name: "company4", },
            { nation: "Spain", city: "Madrid", company_name: "company5", },
        ])
        .execute(); 
    };
};