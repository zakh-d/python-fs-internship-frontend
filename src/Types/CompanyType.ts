import User from "./UserType";

type Company = {
    id: string;
    name: string;
    description: string;
    owner: User;
}

export interface CompanyDetail extends Company {
    hidden: boolean;
    is_member: 'yes' | 'no' | 'pending_request' | 'pending_invite';
}

export type CompanyCreate = {
    name: string;
    description: string;
    hidden: boolean;
}

export default Company;