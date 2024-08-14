type User = {
    id: string;
    username: string;
    email: string;
    created_at: Date;
    updated_at: Date;
};

export interface UserDetail extends User {
    first_name: string;
    last_name: string;
}

export interface UserInCompany extends User {
    role: 'owner' | 'admin' | 'member';
}

export type UserUpdate = {
    username?: string;
    first_name?: string;
    last_name?: string;
    new_password?: string;
    password?: string;
};

export default User;