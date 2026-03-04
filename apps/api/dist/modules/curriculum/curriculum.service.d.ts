import { PrismaService } from '../../database/prisma.service';
export declare class CurriculumService {
    private prisma;
    constructor(prisma: PrismaService);
    createCourse(dto: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        languageId: string;
    }>;
    findAllCoursesByLanguage(languageId: string, skip?: number, take?: number): Promise<({
        levels: ({
            modules: ({
                lessons: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    title: string;
                    description: string | null;
                    moduleId: string;
                }[];
            } & {
                id: string;
                title: string;
                order: number;
                levelId: string;
            })[];
        } & {
            id: string;
            title: string;
            order: number;
            courseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        languageId: string;
    })[]>;
    createLevel(dto: any): Promise<{
        id: string;
        title: string;
        order: number;
        courseId: string;
    }>;
    createModule(dto: any): Promise<{
        id: string;
        title: string;
        order: number;
        levelId: string;
    }>;
    createLesson(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleId: string;
    }>;
    getCourseDetail(id: string): Promise<{
        levels: ({
            modules: ({
                lessons: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    title: string;
                    description: string | null;
                    moduleId: string;
                }[];
            } & {
                id: string;
                title: string;
                order: number;
                levelId: string;
            })[];
        } & {
            id: string;
            title: string;
            order: number;
            courseId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        languageId: string;
    }>;
}
