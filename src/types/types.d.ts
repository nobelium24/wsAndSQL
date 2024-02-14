import { UserModel } from '../models/UserModel'; 

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserModel;
    }
}