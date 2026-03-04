import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
    }>;
    register(data: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
    }>;
}
