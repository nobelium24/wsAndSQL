import { UserModel } from '../models/UserModel'; // adjust the import path to match your project structure

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserModel;
    }
}