export interface User {
    uid: string;
    mail: string;
    Name: string;
    lastname: string;
    password: string,
    perfil: 'Usuario' | 'Administrador'
}

export const Roles = ['Administrador', 'Usuario']