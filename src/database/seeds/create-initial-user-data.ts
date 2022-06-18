import { Connection } from 'typeorm'; 
import { Factory, Seeder } from 'typeorm-seeding'; 

export class CreateInitialUserData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
        .createQueryBuilder()
        .insert()
        .into("User")
        .values([
            { name: "user1", email: "user1@gmail.com" },
            { name: "user2", email: "user2@gmail.com" },
            { name: "user3", email: "user3@gmail.com" },
            { name: "user4", email: "user4@gmail.com" },
        ])
        .execute(); 
    };
};