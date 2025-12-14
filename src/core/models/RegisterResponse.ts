import { User } from "./User";

export interface RegisterResponse{
    message: string;
    user:User;
    token: string;
}