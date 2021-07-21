import { Rol } from "./rol.model";

export class User {
    username: string;
    nombres: string;
    password: string;
    enabled: boolean;
    edad: number;
    rol: Rol;
}