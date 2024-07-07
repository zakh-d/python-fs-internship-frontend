import { companies, users } from "../Store/DummyData";
import Company from "../Types/CompanyType";
import User from "../Types/UserType";

export async function userLoader({params}: any): Promise<User | undefined> {
    const userId = params.userId;
    return users.find((user) => user.id === userId);
}

export async function companyLoader({params}: any): Promise<Company | undefined> {
    const companyId = params.companyId;
    return companies.find((company) => company.id === companyId);
}