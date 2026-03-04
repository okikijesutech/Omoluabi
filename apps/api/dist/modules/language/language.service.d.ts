import { PrismaService } from '../../database/prisma.service';
export declare class LanguageService {
    private prisma;
    constructor(prisma: PrismaService);
    createLanguage(dto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        code: string;
        isActive: boolean;
    }>;
    findAllLanguages(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        code: string;
        isActive: boolean;
    }[]>;
}
