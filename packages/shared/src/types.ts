export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type User = {
  id: string;
  createdAt: string;
  email: string;
  username: string;
  password: string;
  role: Role;
};
