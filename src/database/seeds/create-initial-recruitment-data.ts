import { Connection } from 'typeorm'; 
import { Factory, Seeder } from 'typeorm-seeding'; 

export class CreateInitialUserData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
        .createQueryBuilder()
        .insert()
        .into("Recruitment")
        .values([
            { recruit_position: "백엔드 개발자", recruit_content: "백엔드 개발자 모집합니다.", recruit_compensation: 100, stack: "Java", company_id: 1 }, 
            { recruit_position: "프론트엔드 개발자", recruit_content: "프론트엔드 개발자 모집합니다.", recruit_compensation: 100, stack: "React.js", company_id: 1 }, 
            { recruit_position: "백엔드 개발자", recruit_content: "백엔드 개발자 모집합니다.", recruit_compensation: 100, stack: "Python", company_id: 1 }, 
            { recruit_position: "프론트엔드 개발자", recruit_content: "프론트엔드 개발자 모집합니다.", recruit_compensation: 200, stack: "HTML", company_id: 2 }, 
            { recruit_position: "소프트웨어 개발자", recruit_content: "소프트웨어 개발자 모집합니다.", recruit_compensation: 200, stack: "Java", company_id: 2 }, 
            { recruit_position: "검색 플랫폼 개발자", recruit_content: "검색 플랫폼 개발자 모집합니다.", recruit_compensation: 50, stack: "Python", company_id: 2 }, 
            { recruit_position: "소프트웨어 개발자", recruit_content: "소프트웨어 개발자 모집합니다.", recruit_compensation: 50, stack: "Spring", company_id: 3 }, 
            { recruit_position: "서버 개발자", recruit_content: "서버 개발자 모집합니다.", recruit_compensation: 50, stack: "Java", company_id: 3 }, 
            { recruit_position: "인프라 개발자", recruit_content: "인프라 개발자 모집합니다.", recruit_compensation: 300, stack: "AWS", company_id: 3 }, 
            { recruit_position: "프론트엔드 개발자", recruit_content: "프론트엔드 개발자 모집합니다.", recruit_compensation: 300, stack: "Vue", company_id: 4 }, 
            { recruit_position: "React.js 개발자", recruit_content: "React.js 개발자 모집합니다.", recruit_compensation: 300, stack: "React.js", company_id: 4 }, 
            { recruit_position: "자바 서버 개발자", recruit_content: "자바 서버 개발자 모집합니다.", recruit_compensation: 100, stack: "Java", company_id: 5 }, 
            { recruit_position: "DevOps 개발자", recruit_content: "DevOps 개발자 모집합니다.", recruit_compensation: 100, stack: "AWS", company_id: 5 }, 
        ])
        .execute(); 
    };
};