export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export type User = {
    id: string;
    createdAt: string;
    email: string;
    username: string;
    role: Role;
    googleId?: string;
    name?: string;
};
