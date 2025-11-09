import { Role } from "./role.enum";

export interface UserModel {
    name: string;
    email: string;
    role: Role;
}
