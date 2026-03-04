import { LanguageService } from './language.service';
export declare class LanguageController {
    private readonly languageService;
    constructor(languageService: LanguageService);
    create(dto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        code: string;
        isActive: boolean;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        code: string;
        isActive: boolean;
    }[]>;
}
