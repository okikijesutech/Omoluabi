import { PrismaService } from '../../database/prisma.service';
export declare class CurriculumService {
    private prisma;
    constructor(prisma: PrismaService);
    createCourse(dto: any): Promise<any>;
    findAllCoursesByLanguage(languageId: string, skip?: number, take?: number): Promise<any>;
    createLevel(dto: any): Promise<any>;
    createModule(dto: any): Promise<any>;
    createLesson(dto: any): Promise<any>;
    getCourseDetail(id: string): Promise<any>;
}
