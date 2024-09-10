import { Link } from "react-router-dom";
import User from "../Types/UserType";
import { getCompanyPath, getUserProfilePath } from "./router";
import Company from "../Types/CompanyType";
import { QuizzCompletionInfo } from "../Types/QuizzTypes";

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

export const quizzCompletionDataGetters = [
    (item: QuizzCompletionInfo | null) => {
        if (!item) return 'Quizz Title';
        return item.quizz_title;
    },
    (item: QuizzCompletionInfo | null) => {
        if (!item) return 'Latest Complition Date';
        const date = new Date(item.completion_time);
        return date.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'}) + ' ' + date.toLocaleTimeString('en-GB')
    }
]