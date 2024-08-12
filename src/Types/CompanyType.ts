import { UUID } from "crypto";
import User from "./UserType";

type Company = {
    id: UUID;
    name: string;
    description: string;
    owner: User;
}

export interface CompanyDetail extends Company {
    hidden: boolean;
}

export type CompanyCreate = {
    name: string;
    description: string;
    hidden: boolean;
}

export default Company;