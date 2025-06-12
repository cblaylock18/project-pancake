export type User = {
    id: string,
    createdAt: string,
    email: string,
    username: string,
    password: string,
    role: Role
};

enum Role {
    USER,
    ADMIN
}