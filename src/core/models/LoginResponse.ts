import { User } from "./User";

export interface LoginResponse{
    message: string;
    user:User;
    token: string;

}