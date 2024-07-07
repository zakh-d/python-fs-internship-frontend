import { companies, users } from "../Store/DummyData";
import Company from "../Types/CompanyType";
import User from "../Types/UserType";

export async function userLoader({params}: any): Promise<User> {
    const userId = params.userId;
    const user: User | undefined = users.find((user) => user.id === userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

export async function companyLoader({params}: any): Promise<Company> {
    const companyId = params.companyId;
    const company: Company | undefined = companies.find((company) => company.id === companyId);
    if (!company) {
        throw new Error("Company not found");
    }
    return company;
}