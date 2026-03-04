import { CurriculumService } from './curriculum.service';
export declare class CurriculumController {
    private readonly curriculumService;
    constructor(curriculumService: CurriculumService);
    createCourse(dto: any): Promise<any>;
    findAllByLanguage(languageId: string): Promise<any> | never[];
    getCourseDetail(id: string): Promise<any>;
    createLevel(dto: any): Promise<any>;
    createModule(dto: any): Promise<any>;
    createLesson(dto: any): Promise<any>;
}
