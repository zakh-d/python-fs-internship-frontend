import { Link } from "react-router-dom";
import User from "../Types/UserType";
import { getCompanyPath, getUserProfilePath } from "./router";
import Company from "../Types/CompanyType";

export const usernameEmailDataGetters = [
    (item: User | null) => {
        if (!item) return 'Username';
        return <Link to={getUserProfilePath(item.id)}>{item.username}</Link>;
    },
    (item: User | null) => {
        if (!item) return 'Email';
        return item.email;
    },
]

export const companyNameOwnerDataGetters = [
    (item: Company | null) => {
        if (!item) return 'Company Name';
        return <Link to={getCompanyPath(item.id)}>{item.name}</Link>;
    },
    (item: Company | null) => {
        if (!item) return 'Owner';
        return <Link to={getUserProfilePath(item.owner.id)}>{item.owner.username}</Link>;
    },
]