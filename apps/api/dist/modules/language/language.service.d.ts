import { PrismaService } from '../../database/prisma.service';
export declare class LanguageService {
    private prisma;
    constructor(prisma: PrismaService);
    createLanguage(dto: any): Promise<any>;
    findAllLanguages(): Promise<any>;
}
