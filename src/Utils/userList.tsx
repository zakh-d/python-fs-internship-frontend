import { Link } from "react-router-dom";
import User from "../Types/UserType";
import { getUserProfilePath } from "./router";

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